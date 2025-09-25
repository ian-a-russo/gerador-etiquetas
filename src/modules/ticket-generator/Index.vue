<template>
  <CardTicketOptions @update:config="(value: any) => config = value" />

  <main id="pages">
    <section v-for="(chunk, p) in paginated" :key="p" class="sheet">
      <div class="labels">
        <div
          v-for="(item, i) in chunk"
          :key="i"
          class="label"
          :style="{ background: config.bgColor, color: config.textColor }"
        >
          <div class="code">
            <div>{{ item.p1 }}</div>
            <div>-</div>
            <div>{{ item.p2 }}</div>
            <div>-</div>
            <div>{{ item.p3 }}</div>
          </div>
        </div>
        <div
          v-for="i in perPage - chunk.length"
          :key="'empty-' + i"
          class="label"
          style="background: transparent"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import CardTicketOptions from "./components/CardTicketOptions.vue";

const config = ref({
  all: [
    {
      p1: 1,
      p2: "A",
      p3: "E",
    },
  ],
  textColor: "#fff",
  bgColor: "#d73708",
});

const perPage = 20;

const paginated = computed(() => {
  const pages = [];
  for (let i = 0; i < config.value.all.length; i += perPage) {
    pages.push(config.value.all.slice(i, i + perPage));
  }
  return pages;
});
</script>

<style>
@page {
  size: A4 landscape;
  margin: 10mm;
}

#pages {
  display: none;
}

@media print {
  .controls {
    display: none !important;
  }
  #pages {
    display: grid !important;
  }
  body,
  html {
    width: 297mm;
    height: 210mm;
  }
}
html,
body {
  margin: 0;
  padding: 0;
  font-family: Inter, system-ui, -apple-system, Roboto, "Helvetica Neue", Arial,
    sans-serif;
}
.sheet {
  width: 297mm;
  height: 210mm;
  padding: 10mm;
  display: flex;
  align-items: stretch;
  justify-content: center;
  page-break-after: always;
  box-sizing: border-box;
}
.labels {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 6mm;
  width: 100%;
  height: 100%;
}
.label {
  width: 300px;
  height: 150px;
  background: #d73708;
  color: #fff;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  padding: 6mm 3mm;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  border-radius: 4px;
}
.code {
  display: inline-flex;
  align-items: center;
  font-size: 75px;
}
</style>
