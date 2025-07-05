import "./alerte.style.scss";

export class Alert {
  static show(message, type = "info", duration = 3000) {
    const BoiteAlerte = document.createElement("div");
    BoiteAlerte.className = `custom-alert ${type}`;
    BoiteAlerte.innerHTML = `
            ${message}
                <button class="alert-close">&times;</button>
            
        `;
    document.body.appendChild(BoiteAlerte);

    // Faire apparaître la boîte d'alerte avec une animation
    setTimeout(() => {
      BoiteAlerte.classList.add("show");
    }, 10);

    // Fermer la boîte d'alerte après une durée spécifiée
    const fermer = () => {
      BoiteAlerte.classList.remove("show");
      BoiteAlerte.classList.add("hide");
      setTimeout(() => {
        BoiteAlerte.remove();
      }, 500);
    };

    // Ajouter un écouteur d'événement pour le bouton de fermeture
    const closeButton = BoiteAlerte.querySelector(".alert-close");
    closeButton.addEventListener("click", fermer);

    // Fermer la boîte d'alerte après la durée spécifiée
    if (duratiion > 0) {
      setTimeout(() => {
        if (document.body.contains(BoiteAlerte)) {
          fermer();
        }
      }, duration);
    }
  }

  static succes(message, duration) {
    this.show(message, "success", duration);
  }

  static erreur(message, duration) {
    this.show(message, "erreur", duration);
  }

  static attention(message, duration) {
    this.show(message, "attention", duration);
  }

  static confirm(message, confirmText = "Confirmer", cancelText = "Annuler") {
    return new Promise((resolve) => {
      const BoiteAlerte = document.createElement("div");
      BoiteAlerte.className = "custom-alert confirm";
      BoiteAlerte.innerHTML = `
                ${message}
                <div class="alert-bouttons">
                <button class="alert-boutton confirm">${confirmText}</button>
                <button class="alert-boutton cancel">${cancelText}</button>
            </div>
            `;
      document.body.appendChild(BoiteAlerte);
      setTimeout(() => {
        BoiteAlerte.classList.add("show");
      }, 10);

      // Ajouter des écouteurs d'événements pour les boutons de confirmation et d'annulation
      const alerteBouttons = BoiteAlerte.querySelector(".alert-buttons");
      alerteBouttons.addEventListener("click", (event) => {
        if (event.target.classList.contains("confirm")) {
          fermeAlerte(true);
        } else if (event.target.classList.contains("cancel")) {
          fermeAlerte(false);
        }
      });

      const closeAlert = (result) => {
        BoiteAlerte.classList.remove("show");
        BoiteAlerte.classList.add("hide");
        setTimeout(() => {
          BoiteAlerte.remove();
          resolve(result);
        }, 500);
      };
    });
  }
}
