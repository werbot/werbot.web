<script lang="ts">
  import SvgIcon from "$lib/components/SvgIcon.svelte";

  type NotificationType = "error" | "info" | "success" | "warning";

  interface Notification {
    id: number;
    type: NotificationType;
    text: string;
  }

  interface TypeStyle {
    bgColor: string;
    textColor: string;
    label: string;
    icon: string;
  }

  const typeStyles: Record<NotificationType, TypeStyle> = {
    error: { bgColor: "bg-red-500", textColor: "text-red-500", label: "Error", icon: "error" },
    info: { bgColor: "bg-blue-500", textColor: "text-blue-500", label: "Info", icon: "info" },
    success: { bgColor: "bg-green-500", textColor: "text-green-500", label: "Success", icon: "success" },
    warning: { bgColor: "bg-yellow-500", textColor: "text-yellow-500", label: "Warning", icon: "warning" }
  };

  const eventTypes: Array<[string, NotificationType]> = [
    ["connextError", "error"],
    ["connextSuccess", "success"],
    ["connextWarning", "warning"],
    ["connextInfo", "info"]
  ];

  const styleFor = (type: NotificationType): TypeStyle => typeStyles[type];

  let notifications = $state<Notification[]>([]);
  let nextId = 0;

  $effect(() => {
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    const listeners: Array<[string, EventListener]> = [];

    const handleNotification = (type: NotificationType): EventListener => {
      return (event: Event): void => {
        const id = nextId++;
        notifications.push({ id, type, text: String((event as CustomEvent).detail) });
        timers.push(
          setTimeout(() => {
            notifications = notifications.filter((notification) => notification.id !== id);
          }, 4000)
        );
      };
    };

    for (const [eventName, type] of eventTypes) {
      const listener = handleNotification(type);
      listeners.push([eventName, listener]);
      addEventListener(eventName, listener);
    }

    return (): void => {
      for (const [eventName, listener] of listeners) {
        removeEventListener(eventName, listener);
      }
      for (const timer of timers) {
        clearTimeout(timer);
      }
    };
  });
</script>

<div class="alert">
  <div class="w-full max-w-sm">
    {#each notifications as notification (notification.id)}
      <div class="notification">
        <div class="ico {styleFor(notification.type).bgColor}">
          <SvgIcon name={styleFor(notification.type).icon} class="text-white" />
        </div>

        <div class="message">
          <div class="mx-3">
            <span class="font-semibold {styleFor(notification.type).textColor}"
              >{styleFor(notification.type).label}</span
            >
            <p>{notification.text}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
