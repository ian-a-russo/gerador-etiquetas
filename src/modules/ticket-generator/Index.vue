<template>
  <div>
    <CardTicketOptions @update:config="(value) => (config = value)" />

    <main id="pages">
      <section v-for="(chunk, p) in paginated" :key="p" class="sheet">
        <div
          class="labels"
          :style="{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }"
        >
          <div
            v-for="(item, i) in chunk"
            :key="i"
            class="label"
            :style="{ background: config.bgColor, color: config.textColor }"
          >
            <div class="code" :style="{ fontSize }">
              {{ item.code }}
            </div>
          </div>

          <!-- completa a página -->
          <div
            v-for="i in perPage - chunk.length"
            :key="'empty-' + i"
            class="label empty"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import CardTicketOptions from "./components/CardTicketOptions.vue";

type Ticket = { code: string };

const config = ref<{
  all: Ticket[];
  bgColor: string;
  textColor: string;
}>({
  all: [],
  bgColor: "#d73708",
  textColor: "#ffffff",
});

const perPage = 20;

/* ---------------- PAGINAÇÃO ---------------- */

const paginated = computed(() => {
  const pages: Ticket[][] = [];
  for (let i = 0; i < config.value.all.length; i += perPage) {
    pages.push(config.value.all.slice(i, i + perPage));
  }
  return pages;
});

/* ---------------- MÉTRICAS ---------------- */

const maxLength = computed(() => {
  if (!config.value.all.length) return 0;
  return Math.max(...config.value.all.map((t) => t.code.length));
});

/* ---------------- COLUNAS DINÂMICAS ---------------- */

const columns = computed(() => {
  const len = maxLength.value;

  if (len <= 7) return 4;
  if (len <= 10) return 3;
  if (len <= 14) return 2;
  return 1;
});

/* ---------------- FONTE DINÂMICA ---------------- */

const fontSize = computed(() => {
  const len = maxLength.value;

  if (len <= 7) return "64px";
  if (len <= 10) return "56px";
  if (len <= 14) return "48px";
  return "40px";
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
    display: block !important;
  }

  html,
  body {
    width: 297mm;
    height: 210mm;
    margin: 0;
  }
}

.sheet {
  width: 297mm;
  height: 210mm;
  padding: 10mm;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  page-break-after: always;
}

.labels {
  display: grid;
  grid-template-rows: repeat(5, minmax(0, 1fr));
  gap: 6mm;
  width: 100%;
  height: 100%;
}

.label {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  border-radius: 4px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  overflow: hidden;
}

.label.empty {
  background: transparent !important;
}

.code {
  white-space: nowrap;
  word-break: keep-all;
  overflow-wrap: normal;
  line-height: 1;
  text-align: center;
}
</style>
