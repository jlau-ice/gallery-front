import { defineStore } from "pinia";
import { ref } from "vue";
import { getUserLoginUsingGet } from '@/api/userController.ts'


export const useLoginUserStore = defineStore("loginUser", () => {
  const loginUser = ref<API.UserLoginVO>({
    userName: "未登录",
  });

  async function fetchLoginUser() {
    const res = await getUserLoginUsingGet();
    if (res.data.code === 0 && res.data.data) {
      loginUser.value = res.data.data;
    }
  }
  function setLoginUser(newLoginUser: any) {
    loginUser.value = newLoginUser;
  }
  return { loginUser, setLoginUser, fetchLoginUser };
});
