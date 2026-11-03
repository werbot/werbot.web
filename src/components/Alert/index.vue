<template>
  <NotificationGroup group="alerts">
    <div class="alert">
      <div class="w-full max-w-sm">
        <Notification
          v-slot="{ notifications }"
          enter="transform ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
          move="transition duration-500"
          move-delay="delay-300"
        >
          <div v-for="notification in notifications" :key="notification.id" class="notification">
            <div :class="['ico', styleFor(notification.type).bgColor]">
              <SvgIcon :name="styleFor(notification.type).icon" class="text-white" />
            </div>

            <div class="message">
              <div class="mx-3">
                <span :class="['font-semibold', styleFor(notification.type).textColor]">{{
                  styleFor(notification.type).label
                }}</span>
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
import { Notification, NotificationGroup, notify } from "notiwind";
import { SvgIcon } from "@/components";

const handleNotification = (eName: string, notificationType: string): void => {
  const callback = (e: Event): void => {
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

const typeStyles = {
  error: { bgColor: "bg-red-500", textColor: "text-red-500", label: "Error", icon: "error" },
  info: { bgColor: "bg-blue-500", textColor: "text-blue-500", label: "Info", icon: "info" },
  success: { bgColor: "bg-green-500", textColor: "text-green-500", label: "Success", icon: "success" },
  warning: { bgColor: "bg-yellow-500", textColor: "text-yellow-500", label: "Warning", icon: "warning" }
};

const styleFor = (type: unknown): (typeof typeStyles)[keyof typeof typeStyles] =>
  typeStyles[type as keyof typeof typeStyles];
</script>

<style>
@reference "tailwindcss";

.alert {
  @apply pointer-events-none fixed right-0 bottom-0 z-50 flex items-start justify-end p-6 px-4 py-6;

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
