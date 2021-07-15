<template>
  <div class="hello" id="canvasZone">
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentPublicInstance, defineComponent } from 'vue';
import * as BABYLON from '@babylonjs/core'
import createGizmoScene from '@/gizmoScene'

export default defineComponent({
  name: 'HelloWorld',
  mounted() {
    const canvas = document.createElement('canvas')
    const engine = new BABYLON.Engine(canvas, false)

    const scene = createGizmoScene(engine)

    engine.runRenderLoop(() => {
      scene.render()
    })
  }
});
</script>

<style scoped lang="scss">
.hello {
  width: 100%;
  height: 100%;

  canvas {
    width: 100%;
    height: 50%;
  }
}
</style>
