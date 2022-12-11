<template>
    <div>
        <swiper
                :modules="modules"
                :space-between="space"
                :slides-per-view="slides"
                @swiper="onSwiper"
                @slideChange="onSlideChange"
                effect="coverflow"
                :autoplay="false"
                Virtual
                :loop="false"
        >
            <slot></slot>
        </swiper>
    </div>
</template>
<script>
    import { Navigation, Pagination, EffectCoverflow, Autoplay, Virtual } from 'swiper';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/scss';
    import 'swiper/scss/navigation';
    import 'swiper/css/effect-coverflow';
    import 'swiper/css/autoplay'
    export default {
        name: 'Slider',
        props:["slides", "space"],
        components: {
            Swiper,
            SwiperSlide,
        },
        data(){
            return{
                
            }
        },
        setup(props) {
            const onSwiper = (swiper) => {};
            const onSlideChange = () => {};
            const modules = [Navigation, Pagination,Autoplay, Virtual];
            return {
                onSwiper,
                onSlideChange,
                modules: modules
            };
        },
        methods: {
            
        }
    }
</script>