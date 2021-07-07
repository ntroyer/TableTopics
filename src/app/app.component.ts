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
    backgroundMode: {
      enable: true
    },
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
        speed: 3
      },
      number: {
        limit: 0,
        value: 15
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
          minimumValue: 200
        },
        value: 250
      }
    }
  }
}
