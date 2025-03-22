<footer>
  <a href="#" class="main-button">Créer une trace</a>
  <a href="" class="secondary-button accueil-button">Accueil</a>
  <a href="" class="secondary-button traces-button">Traces</a>
  <a href="" class="secondary-button amis-button">Amis</a>
  <a href="" class="secondary-button profil-button">Profil</a>
</footer>

<style lang="scss">
  @import '../assets/styles/vars';
  @import '../assets/styles/main';
  
  footer {
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    .main-button {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 6rem;
      height: 6rem;
      font-size: 0.625rem;
      clip-path: circle(50%);
      color: $white;
      background-color: $neutral-color-dark;
      anchor-name: --main-button;
      position: relative;
    }
    .secondary-button {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 4rem;
      height: 4rem;
      font-size: 0.625rem;
      border-radius: 100%;
      border: 1px solid $neutral-color-dark;
      color: $neutral-color-dark;
      background-color: $white;
      position: absolute;
      position-anchor: --main-button;
    }
    .accueil-button {
      transform: translate(-130%, -50%);
    }
    .traces-button {
      transform: translate(-60%, -140%);
    }
    .amis-button {
      transform: translate(60%, -140%);
    }
    .profil-button {
      transform: translate(130%, -50%);
    }
  }
</style>