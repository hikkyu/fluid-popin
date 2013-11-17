Une popin jQuery flexible, simple d'utilisation et sans positionnement javascript.

Le fondement de cette modal est de pouvoir se centrer horizontalement et verticalement sans calcul javascript. Pour cela la modal doit être placée dans son fog.

## Requirements
- jQuery
- CSS du module

## Exemples
### Avec un lien ouvrant
Voici le cas d'utilisation le plus courant, au click sur le lien la modal s'ouvre.
```
<a href="#popinId" class="popinOpener">Open popin</a>
<div id="popinId" class="fp-modalwrapper">
	<div class="fp-modal">
		<p>Contenu de votre popin</p>
	</div>
</div>

<script>
	$('.popinOpener').fluidPopin();
</script>
```

### Sans lien ouvrant (en cours de développement)
Dans certain cas la modal doit s'ouvrir de manière automatique au chargement de la page. Dans ce cas, déclarez votre module directement sur le modalWrapper.
```
<div id="popinId" class="fp-modalwrapper autoOpener">
	<div class="fp-modal">
		<p>Contenu de votre popin</p>
	</div>
</div>

<script>
	$('.autoOpener').fluidPopin();
</script>
```

### Avec le contrôle via le hash de l'url
Lorsqu'un seul système de modal est mis en place il est peut être intéressant de pouvoir la controller via le hash de l'url
exemple: hhtp://monsite.fr/payment#mentions va automatique ouvrir la modal des mentions légales. Avec ce mode il est aussi possible de tirer parti de la navigation de votre navigateur (précédent/suivant)
```
<a href="#popinId" class="popinOpener">Open popin</a>
<div id="popinId" class="fp-modalwrapper">
	<div class="fp-modal">
		<p>Contenu de votre popin</p>
	</div>
</div>

<script>
	$('.popinOpener').fluidPopin({
		hashControl: true
	});
</script>
```

### Délimitée dans une zone
Dans le cas d'une webapp par exemple il est parfois nécessaire d'ouvrir une modal dans une zone définie. Dans ce cas il suffit simplement de créer le fog dans votre html et d'y insérer votre modal. Ainsi elle ne sera pas déplacée dans un fog créé en bas de page. Cette configuration nécessite que votre zone soit en `position: relative;`
```
<a href="#popinId" class="popinOpener">Open popin</a>
<div class="maZone">
	<div class="fp-fog">
		<div id="popinId" class="fp-modalwrapper">
			<div class="fp-modal">
				<p>Contenu de votre popin</p>
			</div>
		</div>
	</div>
</div>

<script>
	$('.popinOpener').fluidPopin();
</script>
```

## Options
- hashControl: {boolean} default: `false`, give open and close control from hash in url bar
- closerSelector: {jQuery selector} default: `".fp-close"`, define element who can close your modal from the inside
- fogSelector: {jQuery selector} default: `".fp-fog"`, define fog element
- fogTemplate: {String} default: `"<div class="fp-fog"></div>"`, html to create fog if it doesn't existe