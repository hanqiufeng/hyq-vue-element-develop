<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import adminDashboard from "./admin";
import editorDashboard from "./editor";
import hyqDashboard from "./hyq";

export default {
  name: "dashboard",
  components: { adminDashboard, editorDashboard, hyqDashboard },
  data() {
    return {
      currentRole: "adminDashboard"
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  created() {
    if (this.roles.includes("editor")) {
      this.currentRole = "editorDashboard";
    } else if (this.roles.includes("hyq")) {
      this.currentRole = "hyqDashboard";
    }
  }
};
</script>
