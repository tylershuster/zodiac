import { Component } from 'preact';

export const Radio = ({ id, label, options, value, onChange, ...props }) => (
  <fieldset id={`${id}Settings`}>
    <legend>{label}</legend>
    {options.map(option => (
      <div>
        <label for={option.value}>{option.label}</label>
        <input type="radio" id={option.value} checked={value === option.value} name={id} onChange={onChange} />
      </div>
    ))}
  </fieldset>
);

export const Checkbox = ({ id, label, value, onChange, ...props }) => (
  <div>
    <label for={id}>{label}</label>
    <input type="checkbox" name={id} checked={value} onChange={onChange} />
  </div>
);

export default class SettingsPage extends Component {
  render({ settings, visible, onChange, close }) {
    return (
      <div id="settings" class={visible ? 'visible' : 'hidden'}>
        <span className="closeButton" onClick={close} />
        <section id="miscSettings">
          <Radio
            id='orbitStyle'
            label="Orbit Style"
            value={settings.orbitStyle}
            onChange={event => { settings.orbitStyle = event.target.id; onChange(settings); }}
            options={[
              { value: 'spheres', label: 'Spheres'},
              { value: 'classic', label: 'Classic' }
            ]}
          />
          <fieldset id="trailSettings">
            <legend>Planet Trails</legend>
            <Checkbox
              id="trailVisibility"
              label="Show Trails"
              value={settings.trails.visible}
              onChange={event => { settings.trails.visible = event.target.checked; onChange(settings); }}
            />
            <label for="trailLength">Trail Length</label>
            <input name="trailLength" type="number" value={settings.trails.length} onChange={event => {
              settings.trails.length = event.target.value;
              onChange(settings);
            }}/>
          </fieldset>
          <Checkbox
            id="zodiacColor"
            label="Color Zodiac"
            value={settings.zodiac.color}
            onChange={event => { settings.zodiac.color = event.target.checked; onChange(settings); }}
          />
        </section>
        <fieldset id="calculationSettings">
          <legend>Calculations</legend>
          <Checkbox
            id="calculationsVisible"
            label="Show Calculations"
            value={settings.houses.visible && settings.coeli.visible && settings.spheres.visible}
            onChange={event => {
              settings.houses.visible = settings.coeli.visible = settings.spheres.visible = event.target.checked;
              onChange(settings);
            }}
          />
          <Checkbox
            id="houseVisibility"
            label="Show Houses"
            value={settings.houses.visible}
            onChange={event => {
              settings.houses.visible = !settings.houses.visible;
              onChange(settings);
            }}
          />
          <Checkbox
            id="coeliVisibility"
            label="Show Coeli"
            value={settings.coeli.visible}
            onChange={event => {
              settings.coeli.visible = !settings.coeli.visible;
              onChange(settings);
            }}
          />
          <Checkbox
            id="sphereVisibility"
            label="Show Spheres"
            value={settings.spheres.visible}
            onChange={event => {
              settings.spheres.visible = !settings.spheres.visible;
              onChange(settings);
            }}
          />
        </fieldset>
        <fieldset id="aspectSettings">
          <legend>Aspects</legend>
          <Checkbox
            id="aspectVisibility"
            label="Show Aspects"
            value={settings.trines.visible && settings.sextiles.visible && settings.oppositions.visible && settings.squares.visible}
            onChange={event => {
              settings.trines.visible = settings.sextiles.visible = settings.oppositions.visible = settings.squares.visible = event.target.checked;
              onChange(settings);
            }}
          />
          <fieldset id="trineSettings">
            <legend>Trines</legend>
            <Checkbox
              id="trineVisibility"
              label="Show Trines"
              value={settings.trines.visible}
              onChange={event => {
                settings.trines.visible = !settings.trines.visible;
                onChange(settings);
              }}
            />
            <label for="trineOrb">Trine Orb</label>
            <input name="trineOrb" type="number" value={settings.trines.orb} onChange={event => {
              settings.trines.orb = event.target.value;
              onChange(settings);
            }}/>
          </fieldset>
          <fieldset id="sextileSettings">
            <legend>Sextiles</legend>
            <Checkbox
              id="sextileVisibility"
              label="Show Sextiles"
              value={settings.sextiles.visible}
              onChange={event => {
                settings.sextiles.visible = !settings.sextiles.visible;
                onChange(settings);
              }}
            />
            <label for="sextileOrb">Sextile Orb</label>
            <input name="sextileOrb" type="number" value={settings.sextiles.orb} onChange={event => {
              settings.sextiles.orb = event.target.value;
              onChange(settings);
            }}/>
          </fieldset>
          <fieldset id="squareSettings">
            <legend>Squares</legend>
            <Checkbox
              id="squareVisibility"
              label="Show Squares"
              value={settings.squares.visible}
              onChange={event => {
                settings.squares.visible = !settings.squares.visible;
                onChange(settings);
              }}
            />
            <label for="squareOrb">Square Orb</label>
            <input name="squareOrb" type="number" value={settings.squares.orb} onChange={event => {
                settings.squares.orb = event.target.value;
                onChange(settings);
              }}/>
          </fieldset>
          <fieldset id="oppositionSettings">
            <legend>Oppositions</legend>
            <Checkbox
              id="oppositionVisibility"
              label="Show Oppositions"
              value={settings.oppositions.visible}
              onChange={event => {
                settings.oppositions.visible = !settings.oppositions.visible;
                onChange(settings);
              }}
            />
            <label for="oppositionOrb">Opposition Orb</label>
            <input name="oppositionOrb" type="number" value={settings.oppositions.orb} onChange={event => {
              settings.oppositions.orb = event.target.value;
              onChange(settings);
            }}/>
          </fieldset>
        </fieldset>
        <a href="/assets/readme.txt" target="_blank">Readme</a>
      </div>
    );
  }
}
