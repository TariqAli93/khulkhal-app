<template>
  <div
    class="flex flex-col items-center justify-center p-4 w-1/2 mx-auto mt-4 countdown"
  >
    <div class="grid grid-cols-4 gap-14 items-center justify-center">
      <div class="flex w-24 flex-col items-center justify-center ring-2 ring-indigo-600 rounded-lg py-5 px-2">
        <span class="text-3xl font-light text-indigo-500">{{ days }}</span>
        <div class="w-full ring-1 ring-indigo-500 my-1"></div>
        <span class="text-xl font-light text-indigo-500">يوم</span>
      </div>

      <div class="flex w-24 flex-col items-center justify-center ring-2 ring-indigo-600 rounded-lg py-5 px-2">
        <span class="text-3xl font-light text-indigo-500">{{ hours }}</span>
        <div class="w-full ring-1 ring-indigo-500 my-1"></div>
        <span class="text-xl font-light text-indigo-500">ساعة</span>
      </div>

      <div class="flex w-24 flex-col items-center justify-center ring-2 ring-indigo-600 rounded-lg py-5 px-2">
        <span class="text-3xl font-light text-indigo-500">{{ minutes }}</span>
        <div class="w-full ring-1 ring-indigo-500 my-1"></div>
        <span class="text-xl font-light text-indigo-500">دقيقة</span>
      </div>

      <div class="flex w-24 flex-col items-center justify-center ring-2 ring-indigo-600 rounded-lg py-5 px-2">
        <span class="text-3xl font-light text-indigo-500">{{ seconds }}</span>
        <div class="w-full ring-1 ring-indigo-500 my-1"></div>
        <span class="text-xl font-light text-indigo-500">ثانية</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const days = ref(0);
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);

    const countDownDate = new Date("Jan 1, 2024 00:00:00").getTime();

    const x = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      days.value = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours.value = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds.value = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(x);
        days.value = 0;
        hours.value = 0;
        minutes.value = 0;
        seconds.value = 0;
      }
    }, 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  },
};
</script>

<style></style>
