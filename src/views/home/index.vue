<template>
  <div class="view-home">
    <div class="view-home__info">
      <span>
        Привет! Данный проект является моим небольшим портфолио для ревью кода. Писал я его 5 дней без особой спешки.
        Здесь нет авторизации (но я делал авторизацию через авторизационные куки + jwt-токен на другом проекте, ксати там был Nuxt, а это чутка усложняет задачку :) )
        Также тут нет загрузки файлов через input type file, так как в качестве сервера в портфолио я использую json-web-server.
      </span>
    </div>

    <div class="view-home__link-box">
      <router-link to="/crm" class="view-home__link">
        Go to crm
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewHome',
}
</script>

<style lang="scss" scoped>
.view-home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.view-home__link-box {
  margin-top: 20px;
}

.view-home__link {
  position: relative;
  font-weight: 500;
  font-size: 17px;
  color: #2c2c2c;
  &:before {
    position: absolute;
    content: '';
    width: 30%;
    height: 1px;
    left: 0;
    bottom: -3px;
    background-color: #2c2c2c;
    transition: .2s;
  }
  &:hover {
    &:before {
      width: 100%;
    }
  }
}

.view-home__info {
  width: 480px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0 10px -1px rgba(166, 166, 166, 0.65);
  padding: 15px;
  font-size: 17px;
  line-height: 120%;
  color: #444444;
  text-align:justify;
}
</style>
