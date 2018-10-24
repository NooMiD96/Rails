import Vue from "vue";
import { Component } from "vue-property-decorator";
import Navmenu from "../navmenu/navmenu.vue";

@Component({
  components: {
    MenuComponent: Navmenu,
  },
})
export default class AppComponent extends Vue { }
