<template>
  <section class="user_management d_f h_100">
    <section class="department">
      <OrgTree v-model:id="selectedId" :list="organizationList" />
    </section>
    <section class="user">
      <el-input
        style="margin-bottom: 10px"
        v-model="name"
        placeholder="名称搜索"
        prefix-icon="Search"
        @keyup.enter="getUserList"
      />
      <UserTable :list="userList" />
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, defineAsyncComponent, watch } from "vue";

import orgApi from "@/api/org";
import userApi from "@/api/user";

interface Organization {
  id: string;
  name: string;
}

export default defineComponent({
  components: {
    OrgTree: defineAsyncComponent(() => import("@/components/OrgTree.vue")),
    UserTable: defineAsyncComponent(() => import("@/components/UserTable.vue")),
  },
  setup() {
    const name = ref<string>("");
    const selectedId = ref<string>("");
    const organizationList = ref<Organization[]>([]);
    const userList = ref<Organization[]>([]);

    const defaultProps = {
      children: "children",
      label: "label",
    };

    const getOrganizationList = async () => {
      const res = await orgApi.query();
      organizationList.value = res;
    };

    const getUserList = async () => {
      const res = await userApi.query({
        name: name.value,
        orgId: selectedId.value,
      });
      userList.value = res;
    };

    // 直接调用
    const onCreated = () => {
      getOrganizationList();
    };
    onCreated();

    watch(selectedId, () => {
      name.value = ''
      getUserList();
    });

    return {
      name,
      userList,
      selectedId,
      defaultProps,
      organizationList,
      getUserList,
    };
  },
});
</script>

<style lang="scss" scoped>
.user_management {
  .department {
    flex: 1;
    box-sizing: border-box;
    border-right: 1px solid #cac8c8;
  }
  .user {
    flex: 4;
    padding: 10px 20px;
  }
}
</style>
