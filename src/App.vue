<template>
  <div class="page-wrapper">
    <div class="modal" v-if="isShowModal">
      <t-form class="form_add_contact">
        <SquareX @click="isShowModal = false" class="close-modal"></SquareX>
        <t-form-item label="Имя">
          <t-input-default v-model:value="formValue.name" placeholder="Имя">
          </t-input-default>
        </t-form-item>
        <t-form-item label="Номер телефона">
          <t-input-number-phone
            v-model:value="formValue.phone"
            :mask="'+7 (___) ___-__-__'"
            placeholder="+_ (___) ___-__-__"
          >
          </t-input-number-phone>
        </t-form-item>
        <t-form-item label="Назначить руководителя">
          <t-select
            v-model:value="formValue.director"
            customValue="label"
            customLabel="label"
            :options="dataSelect"
          />
        </t-form-item>
        <t-button style="margin-bottom: 20px" @click.prevent="handleSaveContact"
          >Сохранить</t-button
        >
        <div style="height: 30px">
          <div v-if="isError" class="error">Поля не должны быть пустыми</div>
        </div>
      </t-form>
    </div>
    <div>
      <div class="table_wrapper">
        <h1>Контакты</h1>
        <div>
          <t-button @click="isShowModal = true">+Добавить</t-button>
        </div>
      </div>
      <table-component :data="data" :columns="columns" />
    </div>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import { ref, computed, watch } from "vue";
import TableComponent from "./components/TableComponent.vue";
import { findObjectById } from "./shared/utils/findObjectById.js";
import { SquareX } from "lucide-vue-next";
const isShowModal = ref(false);
const formValue = ref({
  name: "",
  phone: "",
  director: {},
});
const data = ref(JSON.parse(localStorage.getItem("contact")) || []);
const dataSelect = ref([{ label: "Не выбрано", value: "" }]);
const isError = ref(false);

const saveContact = () => {
  let newDirector = {
    label: formValue.value.name,
    value: uuidv4(),
  };

  let newContact = {
    id: uuidv4(),
    name: formValue.value.name,
    phone: formValue.value.phone,
    director: newDirector,
    children: [],
  };

  if (formValue.value.director.value) {
    let findDirector = findObjectById(
      data.value,
      formValue.value.director.value
    );
    console.log(findDirector, "findDirector");

    if (findDirector) {
      findDirector.children.push(newContact);
    } else {
      data.value.push(newContact);
    }
  } else {
    data.value.push(newContact);
  }

  localStorage.setItem("contact", JSON.stringify(data.value));
  formValue.value = { name: "", phone: "", director: {} };
  isShowModal.value = false;
  isError.value = false;
};

const handleSaveContact = () => {
  const isValid = Object.values(formValue.value).every((value) => {
    return (
      value !== "" &&
      (typeof value !== "object" || Object.keys(value).length > 0)
    );
  });
  if (isValid) {
    saveContact();
  } else {
    isError.value = true;
    return;
  }
};

const updateDataSelect = () => {
  const traverse = (node, result = []) => {
    if (node.director) {
      result.push({
        value: node.director.value,
        label: node.director.label,
      });
    }
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => traverse(child, result));
    }
    return result;
  };

  let allDirectors = [];
  data.value.forEach((item) => {
    allDirectors = traverse(item, allDirectors);
  });
  dataSelect.value = [{ label: "Не выбрано", value: "" }, ...allDirectors];
};

watch(
  data,
  () => {
    updateDataSelect();
  },
  {
    deep: true,
    immediate: true,
  }
);
const columns = ref([
  {
    title: "Имя",
    key: "name",
  },
  {
    title: "Номер телефона",
    key: "phone",
  },
]);
</script>

<style scoped>
.page-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: start;
  gap: 20px;
}
.form_add_contact {
  position: relative;
  width: 40vw;
  max-width: 600px;
  min-width: 320px;
  z-index: 1000;
  background: #202020;
}
.table_wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.error {
  width: 100%;
  text-align: center;
  color: red;
}
.modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.479);
}
.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
