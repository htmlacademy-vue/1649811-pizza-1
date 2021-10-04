import { AppRoute, Message } from "../const/common";

export default {
  methods: {
    async $logout() {
      await this.$store.dispatch("auth/logout");
      this.$notifier.success(Message.LOGOUT_SUCCESS);
      await this.$router.push(AppRoute.MAIN);
    },
  },
};
