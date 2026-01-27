<template>
  <v-card class="controls">
     <div class="d-flex justify-center align-center">
      <img src="/logo.png" width="180"></img>
    </div>

    <h3>Padrão do Ticket</h3>

    <v-text-field
      v-model="pattern"
      label="Pattern"
      placeholder="Ex: LNN-NN-L"
      outlined
      dense
    />

    <!-- OPÇÃO DE SEPARADOR -->
    <v-switch v-model="useDash" label="Usar hífen (-) como separador" inset />

    <!-- BLOCOS GERADOS -->
    <div v-for="(block, i) in blocks" :key="i" class="block">
      <strong> Bloco {{ i + 1 }} — {{ block.type }} ({{ block.size }}) </strong>

      <div class="row">
        <template v-if="block.type === 'L'">
          <v-text-field
            v-model="block.start"
            label="Letra início"
            maxlength="1"
            dense
            outlined
          />
          <v-text-field
            v-model="block.end"
            label="Letra fim"
            maxlength="1"
            dense
            outlined
          />
        </template>

        <template v-else>
          <v-number-input
            v-model="block.start as number"
            label="Número início"
            dense
            outlined
          />
          <v-number-input
            v-model="block.end as number"
            label="Número fim"
            dense
            outlined
          />
        </template>
      </div>
    </div>

    <!-- CORES -->
    <v-row>
      <v-col md="6">
        <label>Cor do fundo</label>
        <v-color-picker v-model="bgColor" flat />
      </v-col>
      <v-col md="6">
        <label>Cor do texto</label>
        <v-color-picker v-model="textColor" flat />
      </v-col>
    </v-row>

    <v-card-actions>
      <v-btn block color="primary" @click="printPage"> Gerar e imprimir </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";

type Block = {
  type: "L" | "N";
  size: number;
  start: string | number;
  end: string | number;
};

const emit = defineEmits(["update:config"]);

const pattern = ref("LNN-NN-L");
const blocks = ref<Block[]>([]);
const bgColor = ref("#d73708");
const textColor = ref("#ffffff");

const useDash = ref(true);
const separator = computed(() => (useDash.value ? "-" : " "));

/* -------- PARSER -------- */

function parsePattern() {
  const segments = pattern.value.split("-");
  const result: Block[] = [];

  for (const segment of segments) {
    let i = 0;

    while (i < segment.length) {
      const char = segment[i] as "L" | "N";
      let j = i;

      while (segment[j] === char) j++;

      result.push({
        type: char,
        size: j - i,
        start: char === "L" ? "A" : 1,
        end: char === "L" ? "Z" : 10,
      });

      i = j;
    }
  }

  blocks.value = result;
}

watch(pattern, parsePattern, { immediate: true });

/* -------- HELPERS -------- */

function rangeLetters(start: string, end: string) {
  const res: string[] = [];
  for (let i = start.charCodeAt(0); i <= end.charCodeAt(0); i++) {
    res.push(String.fromCharCode(i));
  }
  return res;
}

function cartesian(arrays: string[][]) {
  return arrays.reduce((a, b) => a.flatMap((d) => b.map((e) => [...d, e])), [
    [],
  ] as string[][]);
}

/* -------- GENERATE -------- */

function generate() {
  const values = blocks.value.map((block) => {
    if (block.type === "L") {
      const letters = rangeLetters(block.start as string, block.end as string);

      if (block.size === 1) return letters;

      return cartesian(Array(block.size).fill(letters)).map((v) => v.join(""));
    }

    // NÚMEROS
    return Array.from(
      { length: Number(block.end) - Number(block.start) + 1 },
      (_, i) => String(Number(block.start) + i).padStart(block.size, "0"),
    );
  });

  return cartesian(values).map((v) => ({
    code: v.join(separator.value),
  }));
}

function printPage() {
  const all = generate();

  emit("update:config", {
    all,
    bgColor: bgColor.value,
    textColor: textColor.value,
  });

  setTimeout(() => window.print(), 50);
}
</script>

<style scoped>
.controls {
  max-width: 600px;
  margin: 20px auto;
  padding: 24px 20px;
  border-radius: 12px;
  background: rgba(0, 17, 27, 0.5);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: "Inter", sans-serif;
}

.controls .form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.controls label {
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
}

.controls .row {
  display: flex;
  gap: 10px;
}

.controls .colors {
  display: flex;
  gap: 15px;
  justify-content: space-between;
}

.controls button {
  background: #d73708;
  color: #fff;
  border: none;
  padding: 10px 18px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-end;
}

.controls button:hover {
  background: #b72f06;
}

@media (max-width: 768px) {
  .controls {
    width: 90%;
    padding: 16px;
  }

  .controls .colors {
    flex-direction: column;
  }
}

.label {
  width: 150px;
  height: 75px;
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
  font-size: 37.5px;
}

.ticket {
  white-space: nowrap !important;
  word-break: keep-all !important;
  overflow-wrap: normal !important;
  line-height: 1;
}

.ticket-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}
</style>
