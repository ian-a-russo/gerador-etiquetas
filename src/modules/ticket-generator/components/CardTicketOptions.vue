<template>
  <v-card class="controls">
    <div class="d-flex justify-center align-center">
      <img src="/logo.png" width="180"></img>
    </div>

    <div class="form-group">
      <v-row>
        <v-col md="6">
          <div>
            <v-icon class="mr-2"> mdi-arrow-right-bold-circle </v-icon>
            <label>Prefixo</label>
          </div>
          <v-number-input
            control-variant="stacked"
            v-model="first"
            outlined
            density="compact"
            hide-details
            :min="1"
          />
        </v-col>
        <v-col md="6">
          <div>
            <v-icon class="mr-2"> mdi-arrow-right-bold-circle </v-icon>
            <label>Letras (de → até)</label>
          </div>
          <div class="row">
            <v-text-field
              density="compact"
              hide-details
              v-model="letterStart"
              maxlength="1"
              outlined
              dense
            />
            <v-text-field
              density="compact"
              hide-details
              v-model="letterEnd"
              maxlength="1"
              outlined
              dense
            />
          </div>
        </v-col>
      </v-row>
      <div>
        <v-icon class="mr-2"> mdi-arrow-right-bold-circle </v-icon>
        <label>Números (de → até)</label>
      </div>
      <div class="row">
        <v-number-input
          control-variant="stacked"
          density="compact"
          v-model="numStart"
          outlined
          dense
          hide-details
          :min="1"
        />
        <v-number-input
          control-variant="stacked"
          density="compact"
          v-model="numEnd"
          outlined
          dense
          hide-details
          :min="1"
        />
      </div>
    </div>

    <div class="form-group numbers"></div>

    <div class="form-group colors">
      <v-row v-if="!vuetify.display.mobile.value">
        <v-col md="6">
          <div>
            <div class="mb-2">
              <v-icon class="mr-2"> mdi-arrow-right-bold-circle </v-icon>
              <label>Cor do fundo</label>
            </div>
            <v-color-picker
              style="background-color: rgba(0, 0, 0, 0.5)"
              v-model="bgColor"
              flat
              mode="hexa"
              width="100%"
            />
          </div>
        </v-col>
        <v-col md="6">
          <div>
            <div class="mb-2">
              <v-icon class="mr-2"> mdi-arrow-right-bold-circle </v-icon>
              <label>Cor do texto</label>
            </div>
            <v-color-picker
              style="background-color: rgba(0, 0, 0, 0.5)"
              :model-value="textColor"
              @update:model-value="(val) => (textColor = val)"
              flat
              mode="hexa"
              width="100%"
            />
          </div>
        </v-col>
      </v-row>
      <div v-else>
        <div>
          <div class="mb-2">
            <v-icon class="mr-2"> mdi-arrow-right-bold-circle </v-icon>
            <label>Cor do fundo</label>
          </div>
          <v-color-picker
            style="background-color: rgba(0, 0, 0, 0.5)"
            v-model="bgColor"
            flat
            mode="hexa"
            width="100%"
            hide-canvas
          />
        </div>

        <div>
          <div class="mb-2">
            <v-icon class="mr-2"> mdi-arrow-right-bold-circle </v-icon>
            <label>Cor do texto</label>
          </div>
          <v-color-picker
            style="background-color: rgba(0, 0, 0, 0.5)"
            :model-value="textColor"
            @update:model-value="(val) => (textColor = val)"
            flat
            mode="hexa"
            width="100%"
            hide-canvas
          />
        </div>
      </div>
    </div>

    <div class="d-flex align-center justify-center">
      <div>
        <div class="mb-2 d-flex justify-center">
          <v-icon class="mr-2"> mdi-palette </v-icon>
          <label>Resultado:</label>
        </div>

        <div class="label" :style="{ background: bgColor, color: textColor }">
          <div class="code">
            <div>1</div>
            <div>-</div>
            <div>A</div>
            <div>-</div>
            <div>01</div>
          </div>
        </div>
      </div>
    </div>

    <v-card-actions>
      <v-btn @click="printPage" block prepend-icon="mdi-file-table">
        Gerar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import vuetify from "@/plugins/vuetify";

const emit = defineEmits(["update:config"]);
const first = ref(1);
const letterStart = ref("A");
const letterEnd = ref("E");
const numStart = ref(1);
const numEnd = ref(10);
const bgColor = ref("#d73708");
const textColor = ref("#ffffff");
const all = ref<
  {
    p1: number;
    p2: string;
    p3: string;
  }[]
>([]);

watch([bgColor, textColor, all], () => {
  emit("update:config", { all, bgColor, textColor });
});

function rangeLetters(start: string, end: string) {
  const result = [];
  let s = start.toUpperCase().charCodeAt(0);
  let e = end.toUpperCase().charCodeAt(0);
  for (let i = s; i <= e; i++) {
    result.push(String.fromCharCode(i));
  }
  return result;
}

async function generate() {
  const letters = rangeLetters(letterStart.value, letterEnd.value);
  const nums = Array.from(
    { length: numEnd.value - numStart.value + 1 },
    (_, i) => String(numStart.value + i).padStart(2, "0")
  );

  const generated = [];
  for (const L of letters) {
    for (const N of nums) {
      generated.push({ p1: first.value, p2: L, p3: N });
    }
  }
  all.value = generated;
}

async function printPage() {
  await generate();
  window.print();
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
</style>
