import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TableTopics';

  particlesName = "tsparticles";

  particlesOptions = {
    background: {
      color: {
        value: "#FFFECB"
      }
    },
    particles: {
      color: {
        value: ["#FFBC7F"]
      },
      move: {
        direction: "right",
        enable: true,
        speed: 3,
        straight: true
      },
      number: {
        density: {
          enable: true,
          area: 800,
          factor: 1000
        },
        limit: 0,
        value: 2
      },
      opacity: {
        animation: {
          enable: false,
          minimumValue: 0.1,
          speed: 1,
          sync: false
        },
        random: {
          enable: true,
          minimumValue: 0.3
        },
        value: 0.5
      },
      size: {
        random: {
          enable: true,
          minimumValue: 250
        },
        value: 350
      }
    }
  }
}
