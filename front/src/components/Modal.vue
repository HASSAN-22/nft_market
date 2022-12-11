<template>
  <div>
    <div v-show="showModal"  id="modal" class="overflow-x-hidden overflow-y-auto shadow-lg fixed inset-0 z-50 outline-none focus:outline-none justify-center flex">
      <div :class="['relative my-6 mx-auto',width]">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-d-color-blue-lighter-dark outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid bg-d-color-blue-light rounded-t">
            <h3 class="text-3xl font-semibold rem--7 text-crimson-200">
              {{ title }}
            </h3>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto bg-d-color-blue-dark">
            <slot></slot>
          </div>
          <!--footer-->
          <div class="flex items-center justify-start gap-4 p-6 border-t border-solid bg-d-color-blue-light rounded-b">
              <Button v-show="save !== ''" :text="save" :btnLoading="btnLoading" @callback="$emit('callback')" :my_class="btnLoading ? '!cursor-not-allowed !opacity-80' : '!cursor-pointer !opacity-100'">
                 
              </Button>
              <Button text="بستن" my_class="!hover:bg-crimson-300 hover:!border-crimson-200" @click="$emit('cancel', showModal=false)" />
          </div>
        </div>
      </div>
    </div>
    <div v-show="showModal" class="opacity-25 fixed inset-0 z-40 bg-d-color-blue-lighter-dark"></div>
  </div>
</template>

<script>
import Button from '@/components/Button'
export default {
  name: "regular-modal",
  components:{Button},
  props:{
      title:String,
      save:String,
      btnLoading:false,
      width:{
          type:String,
          default:'w-[50%]'
      }
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    toggleModal(){
      this.showModal = !this.showModal;
    }
  }
}
</script>