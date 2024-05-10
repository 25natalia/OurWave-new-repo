import { iconos } from '../services/dataMenu';
import { Attribute } from '../components/menu/menu';
import { header } from '../services/dataHeader';
import { AttributesHeader } from '../components/header/header';
import { addcontent } from '../services/dataAdd';
import { profile } from '../services/dataProfile';
import { AttributesCard } from '../components/card/card';
import { addObserver, appState, dispatch } from '../store';
import Firebase, { addWave } from '../services/Firebase';
import { waves } from '../types/waves';

const formData: Omit<waves, 'id'> = {
    wave: ''
};

export class Dashboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            // Render initial content
            header.forEach((iconoHeader) => {
                const myHeader = document.createElement('my-header');
                myHeader.setAttribute(AttributesHeader.logo, iconoHeader.logo);
                this.shadowRoot?.appendChild(myHeader);
            });

            const enterWave = this.ownerDocument.createElement('input');
            enterWave.placeholder = 'Enter your Wave';
            enterWave.classList.add('image');
            this.shadowRoot.appendChild(enterWave);

            const save = this.ownerDocument.createElement('button');
            save.innerText = 'Save';
            save.classList.add('save');
            save.addEventListener('click', this.submitForm.bind(this)); // Bind 'this' context
            this.shadowRoot?.appendChild(save);

            // Render previously saved waves
            const savedWaves = localStorage.getItem('savedWaves');
            if (savedWaves) {
                const wavesArray = JSON.parse(savedWaves) as string[];
                wavesArray.forEach(wave => {
                    const waveDisplay = document.createElement('p');
                    waveDisplay.textContent = wave;
                    this.shadowRoot?.appendChild(waveDisplay);
                });
            }

            profile.forEach((element) => {
                const myCard = document.createElement('my-card');
                myCard.setAttribute(AttributesCard.name, element.name);
                myCard.setAttribute(AttributesCard.image, element.image);
                myCard.setAttribute(AttributesCard.wave, element.wave);
                myCard.setAttribute(AttributesCard.unlike, element.unlike);
                myCard.setAttribute(AttributesCard.like, element.like);
                myCard.setAttribute(AttributesCard.cantidadlike, element.cantidadlike);
                myCard.setAttribute(AttributesCard.share, element.share);
                myCard.setAttribute(AttributesCard.cantidadshare, element.cantidadshare);
                myCard.setAttribute(AttributesCard.comentar, element.comentar);
                myCard.setAttribute(AttributesCard.cantidadcomentar, element.cantidadcomentar);
                this.shadowRoot?.appendChild(myCard);
            });

            // Render icons
            iconos.forEach((iconoData) => {
                const myIcono = document.createElement('my-iconos');
                myIcono.setAttribute(Attribute.iconohome, iconoData.iconohome);
                myIcono.setAttribute(Attribute.iconoexplore, iconoData.iconoexplore);
                myIcono.setAttribute(Attribute.iconoprofile, iconoData.iconoprofile);
                this.shadowRoot?.appendChild(myIcono);
            });
        }
    }

    submitForm() {
        const enterWaveInput = this.shadowRoot?.querySelector('.image') as HTMLInputElement;
        const waveText = enterWaveInput.value.trim();
        if (!waveText) return; // Ignore empty wave submissions

        // Add the wave to local storage
        const savedWaves = localStorage.getItem('savedWaves');
        const wavesArray = savedWaves ? JSON.parse(savedWaves) : [];
        wavesArray.unshift(waveText); // Add wave to the beginning of the array
        localStorage.setItem('savedWaves', JSON.stringify(wavesArray));

        // Render the entered wave
        const waveDisplay = document.createElement('p');
        waveDisplay.textContent = waveText;

        // Insert the new wave just after the input and the button
        if (enterWaveInput.nextSibling) {
            this.shadowRoot?.insertBefore(waveDisplay, enterWaveInput.nextSibling.nextSibling);
        } else {
            this.shadowRoot?.appendChild(waveDisplay);
        }

        // Clear the input field
        enterWaveInput.value = '';

        // Log the submitted wave
        console.log('Submitted wave:', waveText);
    }
}

customElements.define('app-dashboard', Dashboard);
