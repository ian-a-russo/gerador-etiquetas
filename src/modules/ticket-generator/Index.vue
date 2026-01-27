<template>
  <div>
    <CardTicketOptions @update:config="(value) => (config = value)" />

    <main id="pages">
      <template v-for="(chunk, p) in paginated" :key="p">
        <section v-if="chunk.length > 0" class="sheet">
          <div
            class="labels"
            :style="{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            }"
          >
            <div
              v-for="(item, i) in chunk"
              :key="i"
              class="label"
              :style="{ background: config.bgColor, color: config.textColor }"
            >
              <div class="ticket-container">
                <div class="code" :style="{ fontSize }">
                  {{ item.code }}
                </div>
              </div>
            </div>

            <!-- labels vazios pra completar a página -->
            <div
              v-if="!isLastPage(p)"
              v-for="i in perPage - chunk.length"
              :key="'empty-' + i"
              class="label empty"
            />
          </div>
        </section>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import CardTicketOptions from "./components/CardTicketOptions.vue";

const config = ref<{
  all: { code: string }[];
  bgColor: string;
  textColor: string;
}>({
  all: [],
  bgColor: "#d73708",
  textColor: "#ffffff",
});
const isLastPage = (index: number) => index === paginated.value.length - 1;

// número fixo de linhas por página (você pode ajustar)
const rows = 5;

// calcula o comprimento máximo dos códigos
const maxLength = computed(() => {
  if (!config.value.all.length) return 0;
  return Math.max(...config.value.all.map((t) => t.code.length));
});

// decide colunas por comprimento
const columns = computed(() => {
  const len = maxLength.value;
  if (len <= 7) return 4;
  if (len <= 10) return 3;
  if (len <= 14) return 2;
  return 1;
});

// perPage = columns * rows (garante que células vazias preencham)
const perPage = computed(() => columns.value * rows);

// paginação com perPage dinâmico
const paginated = computed(() => {
  const pages: { code: string }[][] = [];
  const all = config.value.all || [];

  if (!all.length) return pages;

  for (let i = 0; i < all.length; i += perPage.value) {
    pages.push(all.slice(i, i + perPage.value));
  }

  return pages;
});

// fonte dinâmica
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
  margin: 0;
}

/* NÃO mostrar tickets na tela */
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
    margin: 0;
    padding: 0;
  }
}

.sheet {
  width: 297mm;
  height: 210mm;
  padding: 10mm;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  page-break-after: always;
}

.sheet:last-child {
  page-break-after: auto;
}

.labels {
  display: grid;
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
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  padding: 6mm 3mm;
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

.ticket-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
