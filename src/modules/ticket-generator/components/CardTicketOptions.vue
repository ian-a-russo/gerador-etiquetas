<template>
  <div class="ticket-options-container">
    <div class="d-flex justify-center align-center pt-8 pb-4">
      <img src="/logo.png" width="160" alt="Logo" />
    </div>

    <v-card
      class="mx-auto main-card mb-16"
      max-width="800"
      elevation="10"
      border
    >
      <v-card-text class="pa-4 pa-sm-6 pa-md-8">
        <h2
          class="text-h5 font-weight-bold mb-6 d-flex align-center"
          style="color: rgb(53, 60, 196)"
        >
          <v-icon icon="mdi-ticket-confirmation" class="mr-2"></v-icon>
          Padrão da Etiqueta
        </h2>

        <v-text-field
          v-model="pattern"
          label="Padrão (Ex: LNN-NN-L)"
          placeholder="LNN-NN-L"
          variant="outlined"
          density="comfortable"
          class="mb-2"
          color="rgb(53, 60, 196)"
          hide-details="auto"
          clearable
        />

        <v-switch
          v-model="useDash"
          label="Usar hífen (-) como separador"
          color="rgb(53, 60, 196)"
          inset
          hide-details
          class="mb-6"
        />

        <!-- PREVIEW -->
        <div class="mb-8">
          <div class="text-subtitle-1 font-weight-bold mb-3 text-grey-darken-2">
            Pré-visualização
          </div>
          <v-card
            class="preview-card d-flex align-center justify-center py-6 px-4 mx-auto border"
            :style="{ backgroundColor: bgColor, color: textColor }"
            elevation="2"
          >
            <div
              class="text-h4 text-sm-h3 font-weight-black text-center"
              style="word-break: break-all; line-height: 1.2"
            >
              {{ previewCode || "..." }}
            </div>
          </v-card>
          <div class="text-caption text-center mt-2 text-grey">
            Exemplo baseado na configuração atual
          </div>
        </div>

        <v-divider class="mb-6"></v-divider>

        <h3
          class="text-h6 font-weight-bold mb-4"
          style="color: rgb(53, 60, 196)"
        >
          Configuração dos Blocos
        </h3>

        <!-- BLOCOS GERADOS -->
        <div class="blocks-container">
          <v-card
            v-for="(block, i) in blocks"
            :key="i"
            variant="flat"
            class="mb-4 border rounded-lg"
            style="background-color: rgba(0, 17, 27, 0.5)"
          >
            <v-card-text class="pa-4">
              <div class="d-flex align-center justify-space-between mb-4">
                <div
                  class="text-subtitle-1 font-weight-bold"
                  style="color: rgb(53, 60, 196)"
                >
                  Bloco {{ i + 1 }}
                </div>
                <v-chip
                  size="small"
                  :color="block.type === 'L' ? 'primary' : 'success'"
                  variant="flat"
                  class="font-weight-bold"
                >
                  {{ block.type === "L" ? "Letras" : "Números" }} (Tamanho:
                  {{ block.size }})
                </v-chip>
              </div>

              <v-row>
                <template v-if="block.type === 'L'">
                  <v-col cols="12" sm="6" class="py-2 py-sm-3">
                    <v-text-field
                      v-model="block.start"
                      label="Letra inicial"
                      maxlength="1"
                      density="comfortable"
                      variant="outlined"
                      bg-color="rgba(0, 17, 27, 0.5)"
                      hide-details="auto"
                      color="rgb(53, 60, 196)"
                      @input="
                        block.start = (block.start as string)
                          .replace(/[^a-zA-Z]/g, '')
                          .toUpperCase()
                      "
                    />
                  </v-col>
                  <v-col cols="12" sm="6" class="py-2 py-sm-3">
                    <v-text-field
                      v-model="block.end"
                      label="Letra final"
                      maxlength="1"
                      density="comfortable"
                      variant="outlined"
                      bg-color="rgba(0, 17, 27, 0.5)"
                      hide-details="auto"
                      color="rgb(53, 60, 196)"
                      @input="
                        block.end = (block.end as string)
                          .replace(/[^a-zA-Z]/g, '')
                          .toUpperCase()
                      "
                    />
                  </v-col>
                </template>

                <template v-else>
                  <v-col cols="12" sm="6" class="py-2 py-sm-3">
                    <v-number-input
                      v-model="block.start as number"
                      label="Número inicial"
                      density="comfortable"
                      variant="outlined"
                      bg-color="rgba(0, 17, 27, 0.5)"
                      hide-details="auto"
                      color="rgb(53, 60, 196)"
                      :min="0"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" class="py-2 py-sm-3">
                    <v-number-input
                      v-model="block.end as number"
                      label="Número final"
                      density="comfortable"
                      variant="outlined"
                      bg-color="rgba(0, 17, 27, 0.5)"
                      hide-details="auto"
                      color="rgb(53, 60, 196)"
                      :min="1"
                    />
                  </v-col>
                </template>
              </v-row>
            </v-card-text>
          </v-card>
        </div>

        <v-divider class="my-6"></v-divider>

        <!-- CORES -->
        <h3
          class="text-h6 font-weight-bold mb-4"
          style="color: rgb(53, 60, 196)"
        >
          Cores
        </h3>
        <v-row>
          <v-col cols="12" sm="6">
            <div
              class="text-subtitle-2 mb-2 text-grey-darken-1 font-weight-medium"
            >
              Cor do fundo
            </div>
            <v-color-picker
              v-model="bgColor"
              mode="hexa"
              :modes="['hexa']"
              width="100%"
              elevation="0"
              class="border rounded-lg"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <div
              class="text-subtitle-2 mb-2 text-grey-darken-1 font-weight-medium"
            >
              Cor do texto
            </div>
            <v-color-picker
              v-model="textColor"
              mode="hexa"
              :modes="['hexa']"
              width="100%"
              elevation="0"
              class="border rounded-lg"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- FIXED BOTTOM NAVIGATION -->
    <div class="fixed-bottom-actions border-t elevation-8">
      <v-container class="pa-3 max-w-800 mx-auto" style="max-width: 800px">
        <v-row no-gutters>
          <v-col cols="4" sm="3" class="pr-2">
            <v-btn
              block
              size="large"
              variant="tonal"
              color="grey-darken-2"
              height="54"
              @click="clearForm"
              class="rounded-lg text-none font-weight-bold text-subtitle-1"
            >
              <v-icon icon="mdi-refresh" class="mr-sm-2"></v-icon>
              <span class="d-none d-sm-inline">Limpar</span>
            </v-btn>
          </v-col>
          <v-col cols="8" sm="9" class="pl-2">
            <v-btn
              block
              size="large"
              height="54"
              @click="printPage"
              class="rounded-lg text-none font-weight-bold text-subtitle-1 main-btn"
              style="
                background-color: rgb(53, 60, 196);
                color: rgba(0, 17, 27, 0.5);
              "
              elevation="2"
            >
              <v-icon icon="mdi-printer" class="mr-2"></v-icon>
              Gerar e Imprimir
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";

const emit = defineEmits(["update:config"]);

type Block = {
  type: "L" | "N";
  size: number;
  start: string | number;
  end: string | number;
  separatorAfter: boolean; // indica se DEPOIS deste bloco (no fluxo) deve haver separador
};

const pattern = ref("LNN-NN-L");
const blocks = ref<Block[]>([]);

const bgColor = ref("#d73708");
const textColor = ref("#ffffff");

const useDash = ref(true);
const separator = computed(() => (useDash.value ? "-" : " "));

/* -------- PARSER CORRIGIDO --------
   Observação importante: agora marque `separatorAfter` apenas para o ÚLTIMO
   bloco do segmento quando houver um '-' após o segmento.
*/
function parsePattern() {
  if (!pattern.value) {
    blocks.value = [];
    return;
  }
  const segments = pattern.value.split("-");
  const result: Block[] = [];

  segments.forEach((segment, segIndex) => {
    let i = 0;

    while (i < segment.length) {
      const char = segment[i] as "L" | "N";
      // Ignore characters that are not L or N
      if (char !== "L" && char !== "N") {
        i++;
        continue;
      }

      let j = i;
      while (segment[j] === char) j++;

      // É o último bloco dentro do segmento?
      const isLastBlockInSegment = j >= segment.length;
      result.push({
        type: char,
        size: j - i,
        start: char === "L" ? "A" : 1,
        end: char === "L" ? "Z" : 10,
        // separatorAfter deve ser true somente se este for o último bloco DO segmento
        // e se existir outro segmento depois (segIndex < segments.length - 1)
        separatorAfter: isLastBlockInSegment && segIndex < segments.length - 1,
      });

      i = j;
    }
  });

  blocks.value = result;
}

watch(pattern, parsePattern, { immediate: true });

/* -------- HELPERS -------- */

function rangeLetters(start: string, end: string) {
  if (!start || !end) return ["A"];
  const res: string[] = [];
  const startCode = start.toUpperCase().charCodeAt(0);
  const endCode = end.toUpperCase().charCodeAt(0);

  const min = Math.min(startCode, endCode);
  const max = Math.max(startCode, endCode);

  for (let i = min; i <= max; i++) {
    res.push(String.fromCharCode(i));
  }
  return res;
}

function cartesian(arrays: string[][]) {
  if (arrays.length === 0) return [];
  return arrays.reduce((a, b) => a.flatMap((d) => b.map((e) => [...d, e])), [
    [],
  ] as string[][]);
}

/* -------- GENERATE (usa separator.value) -------- */

function generate() {
  if (blocks.value.length === 0) return [];

  const blockValues = blocks.value.map((block) => {
    if (block.type === "L") {
      const letters = rangeLetters(
        String(block.start || "A"),
        String(block.end || "Z"),
      );
      if (block.size === 1) return letters;
      return cartesian(Array(block.size).fill(letters)).map((v) => v.join(""));
    }

    const startNum = Number(block.start) || 0;
    const endNum = Number(block.end) || 0;
    const min = Math.min(startNum, endNum);
    const max = Math.max(startNum, endNum);

    return Array.from({ length: max - min + 1 }, (_, i) =>
      String(min + i).padStart(block.size, "0"),
    );
  });

  const combinations = cartesian(blockValues);

  return combinations.map((combo) => {
    let code = "";
    combo.forEach((value, i) => {
      code += value;
      if (blocks.value[i]?.separatorAfter) {
        code += separator.value; // usa hífen ou espaço conforme toggle
      }
    });
    return { code };
  });
}

// Compute a preview code dynamically to show in the UI
const previewCode = computed(() => {
  try {
    const all = generate();
    if (all.length > 0) {
      return all[0]?.code;
    }
    return "";
  } catch (e) {
    return "...";
  }
});

/* -------- EMIT E LIMPAR -------- */

function printPage() {
  const all = generate();

  emit("update:config", {
    all,
    bgColor: bgColor.value,
    textColor: textColor.value,
  });

  setTimeout(() => window.print(), 50);
}

function clearForm() {
  pattern.value = "LNN-NN-L";
  useDash.value = true;
  bgColor.value = "#d73708";
  textColor.value = "#ffffff";
  parsePattern();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<style scoped>
.ticket-options-container {
  min-height: 100vh;
  padding-bottom: 90px; /* espaço para o fixed-bottom */
  font-family: "Inter", sans-serif;
  background-color: transparent; /* caso o App.vue já tenha fundo */
}

.main-card {
  border-radius: 16px !important;
  background: rgba(0, 17, 27, 0.5);
}

.preview-card {
  min-height: 120px;
  max-width: 400px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.fixed-bottom-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(39, 0, 61);
  z-index: 100;
}

.main-btn {
  transition: transform 0.1s ease;
}

.main-btn:active {
  transform: scale(0.98);
}

@media print {
  .ticket-options-container {
    display: none !important;
  }
}
</style>
