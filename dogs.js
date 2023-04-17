const app = Vue.createApp({
  data(){
    return{
      title:"Infinite Dog App",
      dogData:[],
      dogType:"",
      dogImg:"https://netrinoimages.s3.eu-west-2.amazonaws.com/2018/07/11/530458/206299/cartoon_dog_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2177386_o.jpg",
      clicked:false,
      currentSlide: 0,
      slides: [],
    }
  },
  watch: {
    dogType: async function(dogType){
      console.log("changed!");
      
      const response = await fetch(`https://dog.ceo/api/breed/${dogType}/images`);
      const data = await response.json();
      this.createSlideShow(data.message);
    }
  },
  methods:{
    toggleClicked(){
      this.clicked = !this.clicked;
    },
    createSlideShow(images){
      this.slides = images;
      setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        // console.log(`当前图片：${images[this.currentSlide]}`);
        this.dogImg = this.slides[this.currentSlide];
      }, 2000);
    },
  },
  // 一載入網頁就執行的程式
  // 先載入選項
  mounted(){
    fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let datas = (Object.keys(data.message));
      for(let i = 0; i < datas.length; i++){
        this.dogData.push(datas[i]);
      }
    })
  }

}).mount("#app");

