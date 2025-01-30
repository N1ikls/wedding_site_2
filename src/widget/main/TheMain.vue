<script setup lang="ts">
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer,
} from "vue-yandex-maps";

import { PageLayout } from "@/shared/ui";
import { collection, doc, setDoc } from "firebase/firestore";
import { useFirestore, useDocument } from "vuefire";
import type { FormInst, FormValidationError } from "naive-ui";
const db = useFirestore();
const message = useMessage();

const formRef = ref<FormInst | null>(null);
const loading = ref(false);
const data = useDocument(doc(collection(db, "wedding"), "id"));

const formValue = ref({
  fio: "",
  presence: "Я приду / Мы придем",
  drinks: [],
});

const rules = {
  fio: {
    required: true,
    message: "Обязательное поле",
  },
};

const setData = <T>(value: T, key: string) => {
  if (!value || !key) return;

  localStorage.setItem(key, JSON.stringify(value));
};

const getData = <T>(key: string) => {
  if (!key) return null;

  const data = JSON.parse(localStorage.getItem(key) || "null");

  return data;
};

const isSend = ref(getData("send") || false);

const sendHandler = () => {
  if (isSend.value) {
    message.warning("Вы уже заполняли форму ранее");
    return;
  }

  formRef.value?.validate(
    async (errors: Array<FormValidationError> | undefined) => {
      if (
        !errors &&
        data.value &&
        data.value.items &&
        Array.isArray(data.value!.items)
      ) {
        loading.value = true;

        await setDoc(doc(collection(db, "wedding"), "id"), {
          items: data.value!.items.concat({ ...formValue.value }),
        });

        loading.value = false;

        message.success("Будем вас ждать!");

        setData(true, "send");

        isSend.value = true;

        return;
      }

      message.error("Заполните обязательное поле");
    }
  );
};
</script>

<template>
  <page-layout no-border>
    <div class="main">
      <div class="main__description description-title">
        <div class="main__description-text">
          ВМЕСТЕ И

          <br />

          НАВСЕГДА
        </div>
      </div>

      <div class="main__and">
        <div class="main__and-text">&</div>
      </div>

      <div class="main__title">
        <div class="main__title-text">Никита</div>
        <div class="main__title-text">Татьяна</div>
      </div>

      <div class="main__description">
        <div class="main__description-text">ПРИГЛАШАЕМ НА СВАДЬБУ</div>
      </div>

      <div class="main__date">
        <div class="main__date-week date">суббота</div>
        <div class="main__date-number">
          <div class="main__date-number-label">июня</div>
          <div class="main__date-number-text">11</div>
        </div>
        <div class="main__date-time date">
          <div class="main__data-time-text">15:20</div>
        </div>
      </div>

      <div class="main__img">
        <img class="main__img-bg" src="../../assets/background.png" />
      </div>
    </div>

    <div class="info">
      <div class="info__bg">
        <div class="card">
          <div class="card__bg">
            <div class="card__title">
              Дорогой <br />
              Гость!
            </div>

            <div class="card__text">
              Мы рады сообщить Вам, что 11.06.2025 в 15:20 состоится самое
              главное торжество в нашей жизни - день нашей свадьбы!

              <br />

              Приглашаем Вас разделить с нами радость этого незабываемого дня.
            </div>

            <div class="card__title">Меню</div>

            <div class="card__text">
              Меню разнообразно, поэтому сообщите нам заранее, если у вас есть
              какие-либо предпочтения или диетические ограничения. После
              подтверждения вы сможете пройти опрос о своих вкусовых
              предпочтениях и напитках.
            </div>

            <div class="card__title">Дресс-код</div>

            <div class="card__text">
              Для нас главное - ваше присутствие! Но мы будем рады, если вы
              добавите в наряды элемент синего\голубого цвета.
            </div>

            <div class="card__title">Пожелания по подаркам</div>

            <div class="card__text">
              Мы понимаем, что дарить цветы на свадьбу - это традиция, но мы не
              сможем насладиться их красотой в полной мере... Будем рады
              альтернативе (в денежном эквиваленте).
            </div>

            <div class="card__title">Примечание</div>

            <div class="card__text">
              Будем благодарны, если вы воздержитесь от криков "Горько" на
              празднике, ведь поцелуй — это знак выражения чувств, он не может
              быть по заказу.
            </div>

            <div class="card__title">Ждем Вас!</div>
          </div>
        </div>

        <div class="card pad-t-3">
          <div class="card__bg">
            <div class="card__title">Свадебное расписание</div>

            <div class="card__text">
              <div class="card__text-time">15:20</div>

              <div class="card__text-title">Торжественная роспись ЗАГС</div>
              <span
                >Приглашаем вас разделить с нами радость создания новой семьи.
                <br />

                Отдел ЗАГС Адмиралтейского района Санкт-Петербурга (1-я
                Красноармейская ул., 6).
              </span>
            </div>

            <div class="card__text">
              <div class="card__text-time">16:30</div>

              <div class="card__text-title">Банкет на теплоходе</div>

              <span> Время вкусной еды, танцев и развлечений.</span>
            </div>

            <div class="card__text">
              <div class="card__text-time">23:00</div>
              <div class="card__text-title">Завершение банкета</div>
              <span>
                К сожалению, даже такой прекрасный вечер может закончиться
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="calendar">
      <div class="card pad-t-3">
        <div class="calendar__card">
          <div class="card__title">Свадебное расписание</div>

          <div class="card__text">
            <div class="card__text-time">15:30</div>

            <div class="card__text-title">Фуршет</div>
            <span> Адрес: ул. Степанова, 50А, станица Днепровская </span>
          </div>

          <div class="card__text">
            <div class="card__text-time">16:00</div>

            <div class="card__text-title">Церемония</div>

            <span> Окутайте себя магией волшебства </span>
          </div>

          <div class="card__text">
            <div class="card__text-time">16:30</div>
            <div class="card__text-title">Банкет</div>
            <span> Время вкусной еды, танцев и развлечений </span>
          </div>

          <div class="card__text">
            <div class="card__text-time">23:00</div>
            <div class="card__text-title">Завершение банкета</div>
            <span>
              К сожалению, даже такой прекрасный вечер может закончиться
            </span>
          </div>
        </div>
      </div>
    </div> -->

    <div class="card pad-t-3 form">
      <div class="form__title">
        Подтвердите, пожалуйста, cвоё присутствие на торжестве
      </div>

      <div class="form__flex">
        <n-form ref="formRef" :model="formValue" :rules="rules">
          <n-form-item
            class="form-item"
            path="presence"
            label="Присутствие на торжестве"
          >
            <n-radio-group size="large" v-model:value="formValue.presence">
              <n-space vertical>
                <n-radio
                  class="radio"
                  label="Я приду / Мы придем"
                  value="Я приду / Мы придем"
                />
                <n-radio
                  class="radio"
                  label="Прийти не получится"
                  value="Прийти не получится"
                />
                <n-radio
                  class="radio"
                  label="Буду со своей парой (+1)"
                  value="Буду со своей парой (+1)"
                />
              </n-space>
            </n-radio-group>
          </n-form-item>

          <n-form-item class="form-item" path="fio" label="Имя и Фамилия">
            <div class="form-item__column">
              <span>
                если вы будете с парой или семьей, то внесите все имена
              </span>
              <n-input v-model:value="formValue.fio" />
            </div>
          </n-form-item>

          <n-form-item
            class="form-item"
            path="drinks"
            label="Предпочтения по напиткам"
          >
            <div class="form-item__column">
              <div style="padding-bottom: 10px">
                можно выбрать несколько вариантов
              </div>
              <n-checkbox-group size="large" v-model:value="formValue.drinks">
                <n-space vertical>
                  <n-checkbox class="checkbox" value="Вино" label="Вино" />
                  <n-checkbox class="checkbox" value="Коньяк" label="Коньяк" />
                  <n-checkbox class="checkbox" value="Водка" label="Водка" />
                  <n-checkbox
                    class="checkbox"
                    value="Шампанское"
                    label="Шампанское"
                  />
                  <n-checkbox
                    class="checkbox"
                    value="Что-нибудь безалкогольное"
                    label="Что-нибудь безалкогольное"
                  />
                </n-space>
              </n-checkbox-group>
            </div>
          </n-form-item>

          <n-button
            strong
            secondary
            :loading="loading"
            size="large"
            @click="sendHandler"
          >
            Отправить
          </n-button>
        </n-form>
      </div>
    </div>

    <div class="location">Локация</div>

    <yandex-map
      :settings="{
        location: {
          center: [30.315575, 59.915845],
          zoom: 18,
        },
      }"
      width="100%"
      height="500px"
    >
      <yandex-map-default-scheme-layer />
      <YandexMapDefaultFeaturesLayer />

      <yandex-map-default-marker
        :settings="{
          coordinates: [30.3155, 59.91578],
          title: 'ЗАГС',
        }"
      />
    </yandex-map>
  </page-layout>
</template>

<style lang="scss" scoped>
.calendar {
  background-color: rgb(236, 255, 194);
  background-image: url("../../assets/calendar.png");
  background-position: 50% 50%;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.description-title {
  top: 37% !important;
}

.n-button {
  text-transform: uppercase;
}
.checkbox {
  align-items: center;
  &:deep(.n-checkbox__label) {
    font-size: 18px;
  }
}
.radio {
  &:deep(.n-radio__label) {
    font-size: 18px;
  }

  &:deep(.n-radio__dot-wrapper) {
    padding-bottom: 6px;
  }
}
.form-item {
  &:deep(.n-form-item-label) {
    font-size: 22px;
    font-weight: 600;
  }
  width: 100%;
}
.form {
  font-family: "Cormorant Infant", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__title {
    font-size: 36px;

    font-weight: 500;
  }
  &__text {
    padding-top: 30px;
    font-size: 26px;
    padding-bottom: 30px;
  }
}
.pad-t-3 {
  padding: 30px !important;
}

.location {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  font-size: 36px;
  font-weight: 500;
  font-family: "Cormorant Infant", sans-serif;

  padding-bottom: 20px;
}
.card {
  padding: 0 30px;

  &__bg {
    background: rgba(255, 255, 255, 0.91);
    max-width: 550px;
    padding: 30px;
  }

  &__title {
    font-size: 50px;
    font-family: BickhamScript3;
    text-align: center;
    line-height: 1.25em;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 20px;
  }

  &__text {
    font-size: 20px;
    font-family: "Cormorant Infant", sans-serif;
    text-align: center;
    padding-bottom: 20px;

    &-time {
      font-size: 30px;
    }

    &-title {
      font-size: 30px;
      font-weight: 600;
    }
  }

  &__description {
    font-family: "Cormorant Infant", sans-serif;
    text-align: center;
    font-size: 50px;
  }
}
.info {
  background-image: url("../../assets/bg.png");

  &__bg {
    background-image: url("../../assets/bg_flowers.png");
    background-size: 428px;
    padding-top: 70px;
    padding-bottom: 70px;

    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.date {
  border-top: 1px solid rgb(0, 0, 0);
  border-bottom: 1px solid rgb(0, 0, 0);
  padding: 5px 0;
  width: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: -100px;

  &__date {
    position: absolute;
    top: 80%;
    margin-left: 20px;
    display: flex;
    align-items: center;
    gap: 0 40px;

    z-index: 1;
    animation: appearHeartRevers 2.5s 1 cubic-bezier(0.215, 0.61, 0.355, 1) 0.5s
      backwards;

    // @media screen and (width < 500px) {
    //   top: 70%;
    // }

    font-size: 14px;
    line-height: inherit;
    letter-spacing: 0.1em;
    text-align: center;
    font-family: "Cormorant Infant", sans-serif;
    color: rgb(0, 0, 0) !important;

    &-number {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &-label {
        margin-top: -35px;
      }
      &-text {
        padding-top: 10px;
        font-size: 33px;

        // @media screen and (width < 700px) {
        //   font-size: 22px;
        // }
      }
    }
  }

  &__and {
    position: absolute;
    top: 33%;
    margin-left: 35px;

    &-text {
      font-size: 171.29pt;
      font-family: "Adine Kirnberg", sans-serif;
      color: rgb(239, 236, 207);
      line-height: inherit;
      letter-spacing: 0em;
      text-align: center;

      animation: appearHeartRevers 2.5s 1 cubic-bezier(0.215, 0.61, 0.355, 1)
        0.5s backwards;
    }
  }

  &__title {
    position: absolute;
    top: 45%;
    margin-left: 20px;
    z-index: 1;

    &-text {
      animation: appearHeartRevers 2.5s 1 cubic-bezier(0.215, 0.61, 0.355, 1)
        0.5s backwards;

      font-size: 40.8226pt;
      font-family: Aquarelle;
      color: rgb(0, 0, 0);
      line-height: inherit;
      letter-spacing: 0em;
      text-align: center;
      margin-left: 60px;
      margin-right: 60px;

      // @media screen and (width < 700px) {
      //   font-size: 30pt;
      // }
    }
  }

  &__description {
    position: absolute;
    top: 70%;
    margin-left: 35px;
    z-index: 1;

    &-text {
      font-family: "Cormorant Infant", sans-serif;
      color: rgb(0, 0, 0);
      line-height: inherit;
      letter-spacing: 0.1em;
      text-align: center;

      // @media screen and (width < 700px) {
      //   font-size: 10px;
      // }

      animation: appearHeartRevers 2.5s 1 cubic-bezier(0.215, 0.61, 0.355, 1)
        0.5s backwards;
    }
  }

  &__img {
    animation: appearHeart 2s 1 cubic-bezier(0.215, 0.61, 0.355, 1) 0s backwards;

    &-bg {
      position: relative;
      background-repeat: no-repeat;
      text-align: center;
      font-family: "Lobster", cursive;
      background-size: contain;
      background-position: 50%;

      transition: all 0.1s ease-out 0s;
    }
  }
}

@keyframes appearHeart {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes appearHeartRevers {
  0% {
    opacity: 0;
    transform: scale(2);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
