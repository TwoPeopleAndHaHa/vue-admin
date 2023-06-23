<template>
  <div class="todo_wrap flex_cc_c">
    <div class="todo_container">
      <header class="todo_header flex_cc">
        <div class="all_select">
          <el-checkbox v-model="checkAll" label="all" />
        </div>
        <div class="input_todo">
          <el-input v-model="inputval" @keyup.enter="addNew" placeholder="Please input" clearable />
        </div>
      </header>
      <main class="todo_main">
        <div v-for="(item, index) in todoList" :key="index" class="todo_items flex_cc">
          <div class="check_wrap">
            <el-checkbox v-model="item.isCheck" />
          </div>
          <div class="text_wrap">
            {{ item.text }}
          </div>
          <div class="dele_wrap">
            <el-button class="delete" @click="handleDele(index)"> 删除 </el-button>
          </div>
        </div>
      </main>
      <footer class="todo_footer">3</footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toValue } from "vue";
import type { Ref } from "vue";
interface TodoList {
  id: number;
  text: string;
  isCheck: boolean;
}
const todoList: Ref<Array<TodoList>> = ref([]);

// 增加
let inputval = ref("");
const addNew = () => {
  if (!toValue(inputval)) return;
  let obj = {
    id: Math.random() * 10,
    text: toValue(inputval),
    isCheck: false
  };
  todoList.value.push(obj);
  inputval = ref("");
};

// 删除
const handleDele = (val: number) => {
  todoList.value.forEach((item: TodoList, index: number) => {
    if (index === val) {
      todoList.value.splice(index, 1);
    }
  });
};

const checkAll = ref(false);
</script>

<style scoped lang="scss">
.todo_wrap {
  width: 100%;
  height: 100%;
}
.todo_container {
  width: 50%;
  height: 100%;
  text-align: center;
}

.todo_header,
.todo_footer {
  height: 50px;
  background-color: pink;
  padding: 0 20px;
}
.todo_header {
  border-radius: 15px;
  .all_select {
    height: 100%;
    width: 50px;
    .el-checkbox {
      height: 100%;
      width: 100%;
    }
  }
  .input_todo {
    height: 100%;
    width: 100%;
    .el-input {
      height: 100%;
      width: 100%;
      justify-content: space-between;
    }
  }
}
.todo_main {
  flex: 1;
  height: 450px;
  padding: 0 10px;
  overflow: auto;
  .todo_items {
    height: 50px;
    margin: 10px 0;
    padding: 0 20px;
    text-align: center;
    border-radius: 4px;
    background-color: skyblue;
    justify-content: space-between;
    &:hover .delete {
      display: block;
    }
    .dele_wrap {
      height: 100%;
      width: 60px;
      display: flex;
      align-items: center;
    }
    .delete {
      display: none;
    }
  }
}
.todo_footer {
  border-radius: 15px;
}
</style>
