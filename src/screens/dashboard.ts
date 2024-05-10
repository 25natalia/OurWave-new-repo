import { iconos } from '../services/dataMenu';
import { Attribute } from '../components/menu/menu';
import { header } from '../services/dataHeader';
import { AttributesHeader } from '../components/header/header';
import { addcontent } from '../services/dataAdd';
// import { AttributesAdd } from '../components/addWave/addwave';
import { profile } from '../services/dataProfile';
import { AttributesCard } from '../components/card/card';
import { addObserver, appState, dispatch } from '../store';
import Firebase, {addWave} from '../services/Firebase';
import {waves} from '../types/waves'

const formData: Omit<waves, 'id'> = {
    wave:''
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

            profile.forEach((element) => {
                const myCard = document.createElement('my-card');
                console.log(element);
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

            iconos.forEach((iconoData) => {
                const myIcono = document.createElement('my-iconos');
                myIcono.setAttribute(Attribute.iconohome, iconoData.iconohome);
                myIcono.setAttribute(Attribute.iconoexplore, iconoData.iconoexplore);
                myIcono.setAttribute(Attribute.iconoprofile, iconoData.iconoprofile);
                this.shadowRoot?.appendChild(myIcono);
            });

            // Render previously saved wave text
            if (localStorage.getItem('savedWave')) {
                const savedWave = localStorage.getItem('savedWave')!;
                const waveDisplay = document.createElement('p');
                waveDisplay.textContent = savedWave;
                if (enterWave && enterWave.nextSibling) {
                    this.shadowRoot.insertBefore(waveDisplay, enterWave.nextSibling);
                } else {
                    this.shadowRoot.appendChild(waveDisplay);
                }
            }
        }
    }

    submitForm() {
        // Get the value of the input field
        const enterWaveInput = this.shadowRoot?.querySelector('.image') as HTMLInputElement;
        const waveText = enterWaveInput.value;

        // Set the value of the input field in the formData
        formData.wave = waveText;

        // Log formData
        console.log(formData);

        // Call addWave method with formData
        Firebase.addWave(formData);

        // Clear the input field
        enterWaveInput.value = '';

        // Save the entered wave text to localStorage
        localStorage.setItem('savedWave', waveText);

        // Render the entered wave text above other content
        const waveDisplay = document.createElement('p');
        waveDisplay.textContent = waveText;

        // Insert the waveDisplay element
        if (this.shadowRoot && enterWaveInput && enterWaveInput.nextSibling) {
            this.shadowRoot.insertBefore(waveDisplay, enterWaveInput.nextSibling);
        } else {
            // Handle the case when elements are not available
            console.error("Failed to insert waveDisplay element: required elements are not available.");
        }
    }
}

customElements.define('app-dashboard', Dashboard);
