import { AppRoute, Message } from "../const/common";

export default {
  methods: {
    async $logout() {
      await this.$router.push(AppRoute.MAIN);
      await this.$store.dispatch("auth/logout");
      this.$notifier.success(Message.LOGOUT_SUCCESS);
    },
  },
};
