<style lang="scss">
.product-overview {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
  }

  &__image {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: white;

    img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 1rem;
    border-radius: 0;
    background: white;

    &__title {
      margin-bottom: 1rem;
      font-size: 2.5rem;
      font-weight: 900;
      text-align: center;
    }

    &__price {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(black, 0.2);

      &__value {
        font-size: 2rem;
        font-weight: 300;
      }

      &__currency {
        margin-right: 0.5rem;
        font-size: 1.1rem;
        font-weight: 200;
      }
    }

    &__description {
      margin-bottom: 2rem;
      font-size: 1rem;
      font-weight: 400;
      text-align: right;
    }

    &__actions {
      border-top: 1px solid rgba(black, 0.2);
      width: 100%;
      padding: 10px;
    }
  }
}
</style>

<template>
  <div class="product-overview">
    <div
      v-if="isLoading"
      class="fixed flex items-center justify-center top-0 left-0 z-50 bg-slate-100 bg-opacity-70 w-full h-full"
    >
      <h1 class="text-lg text-indigo-700 font-bold">
        جاري ارسال الطلب الرجاء الانتظار
      </h1>
    </div>

    <div class="product-overview__image ring-1 ring-indigo-600 mb-0 sm:mb-3">
      <img
        :src="`${URL_API}/image/${product.productImage}`"
        alt="product image"
      />
    </div>

    <div class="product-overview__info ring-1 ring-indigo-600 md:mr-3">
      <h1 class="product-overview__info__title text-indigo-600">
        {{ product.productName }}
      </h1>

      <div class="product-overview__info__price">
        <span class="product-overview__info__price__value text-indigo-500">
          {{ product.productPrice }}
        </span>
        <span class="product-overview__info__price__currency text-indigo-400"
          >دينار عراقي</span
        >
      </div>

      <p class="product-overview__info__description text-indigo-500">
        {{ product.productDescription }}
      </p>

      <div class="product-overview__info__actions">
        <div
          v-if="!isFormValidate"
          class="block bg-red-100 ring-1 ring-red-600 rounded-lg w-full p-5 my-5"
        >
          <p class="text-red text-right flex justify-between">
            <span>الرجاء ادخال جميع البيانات</span>
            <span class="text-red-500">!</span>
          </p>
        </div>
        <form ref="orderForm" @submit.prevent="submitOrder()">
          <div class="md:grid md:grid-cols-2 md:gap-6">
            <div class="col-span-1">
              <label for="userName" class="text-indigo-500"
                >الاسم الثلاثي</label
              >
              <input
                id="userName"
                class="mt-1 py-3 px-2 block w-full rounded-md shadow-sm ring-1 focus-visible:outline-none ring-indigo-500 focus:ring-indigo-700 border-0 sm:text-sm"
                placeholder="الاسم"
                v-model="state.userName"
              />
            </div>

            <div class="col-span-1">
              <label for="userPhone" class="text-indigo-500">رقم الهاتف</label>
              <input
                id="userPhone"
                class="mt-1 py-3 px-2 block w-full rounded-md shadow-sm ring-1 focus-visible:outline-none ring-indigo-500 focus:ring-indigo-700 border-0 sm:text-sm"
                placeholder="رقم الهاتف: 07xxxxxxxxxx"
                v-model="state.userPhone"
              />
            </div>

            <div class="col-span-1">
              <label for="province" class="text-indigo-500">المحافظة</label>
              <select
                id="province"
                class="mt-1 py-2 px-2 block w-full rounded-md shadow-sm ring-1 focus-visible:outline-none ring-indigo-500 focus:ring-indigo-700 border-0 sm:text-sm"
                placeholder="المحافظة"
                v-model="state.province"
              >
                <option
                  v-for="prov in provinces"
                  :key="prov.value"
                  :value="prov.text"
                >
                  {{ prov.text }}
                </option>
              </select>
            </div>

            <div class="col-span-1">
              <label for="district" class="text-indigo-500">المنطة</label>
              <input
                id="district"
                class="mt-1 py-3 px-2 block w-full rounded-md shadow-sm ring-1 focus-visible:outline-none ring-indigo-500 focus:ring-indigo-700 border-0 sm:text-sm"
                placeholder="المنطقة"
                v-model="state.district"
              />
            </div>

            <div class="col-span-1">
              <label for="closestPoint" class="text-indigo-500"
                >اقرب نقطة دالة</label
              >
              <input
                id="closestPoint"
                class="mt-1 py-3 px-2 block w-full rounded-md shadow-sm ring-1 focus-visible:outline-none ring-indigo-500 focus:ring-indigo-700 border-0 sm:text-sm"
                placeholder="اقرب نقطة دالة"
                v-model="state.closestPoint"
              />
            </div>

            <div class="col-span-1">
              <label for="qty" class="text-indigo-500">الكمية</label>
              <select
                id="qty"
                class="mt-1 py-2 px-2 block w-full rounded-md shadow-sm ring-1 focus-visible:outline-none ring-indigo-500 focus:ring-indigo-700 border-0 sm:text-sm"
                placeholder="الكمية"
                v-model="state.qty"
              >
                <option
                  v-for="qtys in quantities"
                  :key="qtys.value"
                  :value="qtys.value"
                >
                  {{ qtys.text }} ({{ qtys.hint }})
                </option>
              </select>
            </div>
          </div>

          <div
            class="block bg-indigo-100 ring-1 ring-indigo-600 rounded-lg w-full p-5 my-5"
          >
            <p class="text-indigo-800 text-right flex justify-between">
              <span>السعر الكلي:</span>
              <span>{{ totalPrice }} دينار عراقي</span>
            </p>
          </div>

          <button
            type="submit"
            class="p-3 text-center w-full md:w-40 mx-auto bg-indigo-700 outline-1 text-white rounded shadow-lg outline-indigo-500 active:bg-indigo-600 hover:bg-indigo-600 hover:shadow-2xl transition duration-300 ease-in-out"
          >
            اطلب الان
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useHead } from "@vueuse/head";
import API_URL from "@/plugins/urls.js";
export default {
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      state: {
        userName: "",
        userPhone: "",
        district: "",
        province: "",
        closestPoint: "",
        qty: 1,
      },
      quantities: [
        {
          text: "1 قطعة",
          value: 1,
          hint: "لا يوجد خصم",
          percentage: 0,
        },
        {
          text: "2 قطعة",
          value: 2,
          hint: "خصم 5%",
          percentage: 5,
        },
        {
          text: "3 قطع",
          value: 3,
          hint: "خصم 10%",
          percentage: 10,
        },
        {
          text: "4 قطع",
          value: 4,
          hint: "خصم 15%",
          percentage: 15,
        },
      ],
      provinces: [
        {
          text: "أربيل",
          value: 1,
        },
        {
          text: "الأنبار",
          value: 2,
        },
        {
          text: "بابل",
          value: 3,
        },
        {
          text: "بغداد",
          value: 4,
        },
        {
          text: "البصرة",
          value: 5,
        },
        {
          text: "حلبجة",
          value: 6,
        },
        {
          text: "دهوك",
          value: 7,
        },
        {
          text: "القادسية",
          value: 8,
        },
        {
          text: "ديالى",
          value: 9,
        },
        {
          text: "السليمانية",
          value: 10,
        },
        {
          text: "ذي قار",
          value: 11,
        },
        {
          text: "صلاح الدين",
          value: 12,
        },
        {
          text: "كركوك",
          value: 13,
        },
        {
          text: "كربلاء",
          value: 14,
        },
        {
          text: "المثنى",
          value: 15,
        },
        {
          text: "ميسان",
          value: 16,
        },
        {
          text: "النجف",
          value: 17,
        },
        {
          text: "نينوى",
          value: 18,
        },
        {
          text: "واسط",
          value: 19,
        },
      ],
      product: {},
      isFormValidate: true,
      isLoading: false,
    };
  },

  computed: {
    totalPrice() {
      let originalPrice = this.product.productPrice;
      let discountPercentage = this.quantities[this.state.qty - 1].percentage;
      let discount = originalPrice * (discountPercentage / 100);
      let finalPrice = originalPrice - discount;
      return finalPrice * this.state.qty;
    },

    productName() {
      return Object.keys(this.product).length !== 0 ? this.product.productName : 'منتج';
    },

    URL_API() {
      return API_URL
    }
  },

  methods: {
    async GetProduct() {
      let productId = this.$props.productId;
      try {
        let products = await axios.get(
          `${API_URL}/products/${productId}`
        );
        this.product = products.data;
      } catch (error) {
        console.log(error);
      }
    },

    async submitOrder() {
      this.isLoading = true;
      const result = await this.v$.$validate();
      this.isFormValidate = result;
      if (!result) {
        this.isLoading = false;
        return;
      }

      const order = {
        customerName: this.state.userName,
        customerPhone: this.state.userPhone,
        district: this.state.district,
        province: this.state.province,
        closestPoint: this.state.closestPoint,
        idUser: 17,
        orderItems: [
          {
            idProduct: this.product.productId,
            quantity: this.state.qty,
            totalPrice: this.totalPrice,
            discount:
              this.product.productPrice *
              (this.quantities[this.state.qty - 1].percentage / 100) *
              this.state.qty,
          },
        ],
      };

      try {
        await axios.post(`${API_URL}/orders`, order);

        toast.success("تم ارسال الطلب بنجاح", {
          autoClose: 3000,
          position: "top-center",
        });

        this.initPurchases();
        setTimeout(() => {
          this.isLoading = false;
          this.state = {
            userName: "",
            userPhone: "",
            district: "",
            province: "",
            closestPoint: "",
            qty: 1,
          };
        }, 10000);

        setTimeout(() => {
          this.$router.push("/thankyou", { order });
        }, 15000);
      } catch (error) {
        toast.error("حدث خطأ ما", {
          autoClose: 3000,
          position: "top-center",
        });

        this.isLoading = false;
        console.log(error);
      }
    },

    initPurchases() {
      window.fbq("track", "Purchase", {
        contents: [
          {
            id: this.product.productId,
            quantity: this.state.qty,
          },
        ],
        content_type: "product",
        value: this.totalPrice,
        currency: "IQD",
      });
    },
  },

  setup: () => ({ v$: useValidate() }),

  validations() {
    return {
      state: {
        userName: {
          required,
          minLength: minLength(3),
        },
        userPhone: {
          required,
          minLength: minLength(11),
        },
        district: {
          required,
          minLength: minLength(3),
        },
        province: {
          required,
        },
        closestPoint: {
          required,
          minLength: minLength(3),
        },
      },
    };
  },

  mounted() {
    this.GetProduct();
    useHead({
      titleTemplate: `متجر خلخال | ${this.productName}`
    });
  },
};
</script>