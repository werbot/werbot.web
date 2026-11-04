<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import { api } from "$lib/api";
  import Badge from "$lib/components/Badge.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import Button from "$lib/components/form/Button.svelte";
  import { serverTabs } from "$lib/menus/project-tabs";
  import { routePath } from "$lib/navigation/registry";
  import { projectStore, usePageData } from "$lib/stores";
  import { showApiError, showMessage } from "$lib/utils";

  const pageData = usePageData();

  pageData.base = {};

  const params = $derived(page.params as { projectId?: string; serverId?: string });
  const projectId = $derived(params.projectId ?? "");
  const serverId = $derived(params.serverId ?? "");
  const days = $derived(Object.entries(pageData.base ?? {}) as [string, number[]][]);

  const dayNames: Record<string, string> = {
    mon: "monday",
    tue: "tuesday",
    wed: "wednesday",
    thu: "thursday",
    fri: "friday",
    sat: "saturday",
    sun: "sunday"
  };

  // prettier-ignore
  const templateWork: Record<string, number[]> = {
    //0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23
    monday: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    tuesday: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    wednesday: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    thursday: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    friday: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    saturday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    sunday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  };

  let dragging = false;
  let prevDay: string | number | null = null;
  let prevHour: string | number | null = null;

  const toUiWeek = (week: any): Record<string, number[]> => {
    return Object.fromEntries(
      Object.entries(dayNames).map(([shortName, longName]) => [longName, week?.[shortName] ?? Array(24).fill(0)])
    );
  };

  const toApiWeek = (week: any): Record<string, number[]> => {
    return Object.fromEntries(
      Object.entries(dayNames).map(([shortName, longName]) => [shortName, week?.[longName] ?? Array(24).fill(0)])
    );
  };

  const getData = async (): Promise<void> => {
    try {
      const res = await api().GET(`/v1/schemes/${projectId}/${serverId}/activity`);
      if (res.data) {
        const result = res.data.result;
        pageData.base = toUiWeek(result?.week ?? result);
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const invert = (event: string, day: string | number, hour: string | number): void => {
    if (dragging && event == "mousemove") {
      if (prevDay == day && prevHour == hour) {
        return;
      }
      prevDay = day;
      prevHour = hour;

      pageData.base[day][hour] = Number(!pageData.base[day][hour]);
    }

    if (event == "click") {
      pageData.base[day][hour] = Number(!pageData.base[day][hour]);
    }
  };

  const startDrag = (): void => {
    dragging = true;
  };

  const invertDay = (day: string | number): void => {
    pageData.base[day] = pageData.base[day].map((item: number) => Number(!item));
  };

  const selectTimeWork = (selector: (item: number, day: string, hour: number) => number): void => {
    Object.keys(pageData.base).forEach((day) => {
      pageData.base[day] = pageData.base[day].map((item: number, hour: number) => selector(item, day, hour));
    });
  };

  const selectAll = (): void => {
    selectTimeWork(() => 1);
  };

  const selectNone = (): void => {
    selectTimeWork(() => 0);
  };

  const selectWorkTime = (): void => {
    selectTimeWork((_, day, hour) => templateWork[day][hour]);
  };

  const onUpdate = async (): Promise<void> => {
    try {
      pageData.loading = true;

      const res = await api().UPDATE(
        `/v1/schemes/${projectId}/${serverId}/activity`,
        {},
        {
          activity: toApiWeek(pageData.base)
        }
      );
      if (res.data) {
        showMessage(res.data.message);
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      pageData.loading = false;
    }
  };

  onMount(() => {
    document.title = "Server activity";
    void projectStore.serverNameByID(projectId, serverId);
    void getData();

    window.addEventListener("mouseup", stopDrag);

    return (): void => {
      window.removeEventListener("mouseup", stopDrag);
    };
  });

  function stopDrag(): void {
    dragging = false;
  }
</script>

<div class="artboard">
  <header>
    <h1>
      <a href={routePath("projects-projectId-servers", { projectId })}>Servers</a>
    </h1>
    <div class="breadcrumbs">{projectStore.getServerNameByID(projectId, serverId)}</div>
  </header>
  <Tabs tabs={serverTabs} />
  <div class="desc">Time at which access to the server is possible</div>

  <form
    onsubmit={(event): void => {
      event.preventDefault();
    }}
  >
    <table>
      <tbody>
        {#each days as [day, itemDay] (day)}
          <tr>
            <td class="worktime-weekday w-10 pr-5 outline-hidden select-none">
              <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (legacy click target) -->
              <span
                class="cursor-pointer"
                class:text-red-500={["saturday", "sunday"].includes(String(day))}
                onclick={(): void => invertDay(day)}>{day}</span
              >
            </td>
            <td>
              <div class="flex outline-hidden">
                {#each itemDay as itemHour, hour (hour)}
                  <!-- svelte-ignore a11y_no_noninteractive_element_interactions (legacy drag-select cell) -->
                  <label
                    class="worktime-hours-item mr-1 grow cursor-pointer"
                    onmousemove={(): void => invert("mousemove", day, hour)}
                    onmousedown={startDrag}
                  >
                    <input
                      class="absolute -left-64 h-0 w-0"
                      type="checkbox"
                      checked={Boolean(itemHour)}
                      onclick={(): void => invert("click", day, hour)}
                    />
                    <span
                      class="square inline-flex h-8 w-6 items-center justify-center rounded-sm bg-gray-300 text-white lg:w-full"
                    >
                      {hour}
                    </span>
                  </label>
                {/each}
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="content">
      <Badge name="Select All" class="cursor-pointer" onclick={selectAll} />
      <Badge name="Unselect All" class="cursor-pointer" onclick={selectNone} />
      <Badge name="Select Work Time" class="cursor-pointer" onclick={selectWorkTime} />
    </div>

    <div class="divider"></div>

    <div class="content">
      <Button class="mr-5" loading={pageData.loading} onclick={onUpdate}>Update</Button>
    </div>
  </form>
</div>
