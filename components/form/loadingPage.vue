<template>
  <div>
    <div class="body-loading" v-if="loading">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="text_loading">
        <h2>{{ textShow }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      default: true,
      type: Boolean,
    },
    textShow: {
      default: 'Loading Data',
      type: String,
    },
  },
}
</script>

<style>
.body-loading {
  background-size: cover;
  top: 0;
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: rgb(255 255 255 / 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  bottom: 0;
  flex-direction: column;
}
.text_loading {
  color: #0a54b7;
}
.lds-ellipsis {
  margin-left: 30px;
  display: inline-block;
  position: relative;

  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: linear-gradient(to bottom, #1a68d3 0%, #1993f4 100%);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: -46px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: -46px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: -22px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 2px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
