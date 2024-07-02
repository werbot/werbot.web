<template>
  <NotificationGroup group="alerts">
    <div class="alert">
      <div class="w-full max-w-sm">
        <Notification v-slot="{ notifications }" enter="transform ease-out duration-300 transition" enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0" leave="transition ease-in duration-500" leave-from="opacity-100" leave-to="opacity-0" move="transition duration-500"
          move-delay="delay-300">
          <div v-for="notification in notifications" :key="notification.id" class="notification">
            <div :class="['ico', typeStyles[notification.type].bgColor]">
              <SvgIcon :name="typeStyles[notification.type].icon" class="text-white" />
            </div>

            <div class="message">
              <div class="mx-3">
                <span :class="['font-semibold', typeStyles[notification.type].textColor]">{{ typeStyles[notification.type].label }}</span>
                <p>{{ notification.text }}</p>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>
</template>

<script setup lang="ts">
import { notify, Notification, NotificationGroup } from "notiwind";
import { SvgIcon } from "@/components";
import { computed } from "vue";

const handleNotification = (eName: string, notificationType: string) => {
  const callback = (e: Event) => {
    notify(
      {
        group: "alerts",
        type: notificationType,
        text: (<any>e).detail
      },
      4000
    );
  };

  addEventListener(eName, callback);
  // To remove event listener:
  // removeEventListener(eventName, callback);
};

handleNotification("connextError", "error");
handleNotification("connextSuccess", "success");
handleNotification("connextWarning", "warning");
handleNotification("connextInfo", "info");

const typeStyles = computed(() => ({
  error: { bgColor: "bg-red-500", textColor: "text-red-500", label: "Error", icon: "error" },
  info: { bgColor: "bg-blue-500", textColor: "text-blue-500", label: "Info", icon: "info" },
  success: { bgColor: "bg-green-500", textColor: "text-green-500", label: "Success", icon: "success" },
  warning: { bgColor: "bg-yellow-500", textColor: "text-yellow-500", label: "Warning", icon: "warning" }
}));
</script>

<style lang="scss">
.alert {
  @apply pointer-events-none fixed bottom-0 right-0 z-50 flex items-start justify-end p-6 px-4 py-6;

  & .notification {
    @apply mx-auto mt-4 flex w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md;

    & .ico {
      @apply flex w-12 items-center justify-center;
    }

    & .message {
      @apply -mx-3 px-4 py-2;

      p {
        @apply text-sm text-gray-600;
      }
    }
  }
}
</style>
