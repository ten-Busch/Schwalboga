(function () {
	"use strict";

	var languageStorageKey = "pokedex-name-language";
	var themeStorageKey = "friendly-pokemon-theme";
	var sourceMode = "all";
	var activeSelectorSide = "";
	var playerBySide = { p1: "", p2: "" };
	var pokemonNameMap = {};
	var pokemonEntryByKey = {};
	var moveOptionByKey = {};

	function getLanguage() {
		return localStorage.getItem(languageStorageKey) === "de" ? "de" : "en";
	}

	function normalizeText(value) {
		return String(value || "")
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^a-z0-9]+/g, "");
	}

	function buildPokemonNameMap() {
		if (!Array.isArray(window.POKEDEX_ENTRIES)) return;
		window.POKEDEX_ENTRIES.forEach(function (entry) {
			if (!entry || !entry.name) return;
			pokemonNameMap[entry.name] = entry.names && entry.names.de ? entry.names.de : entry.name;
			pokemonEntryByKey[normalizeText(entry.name)] = entry;
			if (entry.names && entry.names.de) pokemonEntryByKey[normalizeText(entry.names.de)] = entry;
		});
	}

	function getDisplayPokemonName(name) {
		if (getLanguage() !== "de") return name;
		return pokemonNameMap[name] || name;
	}

	function decorateOption(option) {
		if (!option || !option.pokemon) return option;
		var decorated = $.extend({}, option);
		var displayPokemon = getDisplayPokemonName(option.pokemon);
		decorated.displayPokemon = displayPokemon;
		decorated.searchPokemon = option.pokemon + " " + displayPokemon;
		if (option.set) {
			var setName = option.set === "Blank Set" && getLanguage() === "de" ? "Leeres Set" : option.set;
			decorated.displayText = displayPokemon + " (" + setName + ")";
			decorated.text = decorated.displayText;
		} else {
			decorated.displayText = displayPokemon;
			decorated.text = displayPokemon;
		}
		return decorated;
	}

	function formatSetOption(option) {
		var decorated = decorateOption(option);
		if ($("#randoms").prop("checked")) return decorated.displayPokemon || decorated.pokemon;
		if (decorated.set === "Blank Set") return "<b>" + decorated.displayText + "</b>";
		return decorated.set ? ("&nbsp;&nbsp;&nbsp;" + (decorated.set === "Blank Set" && getLanguage() === "de" ? "Leeres Set" : decorated.set)) : ("<b>" + decorated.displayText + "</b>");
	}

	function getPlayers() {
		return Array.isArray(window.SPIELER)
			? window.SPIELER.filter(function (player) { return Array.isArray(player.currentTeam) && player.currentTeam.length; })
			: [];
	}

	function getPlayerByName(name) {
		return getPlayers().filter(function (player) { return player.name === name; })[0] || null;
	}

	function makeBlankSetOption(pokemonName) {
		return decorateOption({
			pokemon: pokemonName,
			set: "Blank Set",
			text: pokemonName + " (Blank Set)",
			id: pokemonName + " (Blank Set)"
		});
	}

	function getDraftOptions(side) {
		var player = getPlayerByName(playerBySide[side]);
		if (!player) return [];
		return player.currentTeam.map(makeBlankSetOption);
	}

	function filterSetOptions(options, side) {
		var resolvedSide = side || activeSelectorSide;
		if (sourceMode === "draft") return getDraftOptions(resolvedSide);
		return options.map(decorateOption);
	}

	function getInitialSetOption(fallback, side) {
		var resolvedSide = side || activeSelectorSide;
		if (sourceMode === "draft") return getDraftOptions(resolvedSide)[0] || fallback;
		return decorateOption(fallback);
	}

	function applyTheme() {
		var isDark = localStorage.getItem(themeStorageKey) === "dark";
		var darkStyles = document.getElementById("dark-theme-styles");
		if (darkStyles) darkStyles.disabled = !isDark;
		document.body.classList.toggle("dark-theme", isDark);
	}

	function applyTranslations() {
		var de = getLanguage() === "de";
		var labels = {
			title: de ? "Damage Calc" : "Damage Calc",
			allPokemon: de ? "Alle Pokemon" : "All Pokemon",
			currentDraft: de ? "Aktueller Draft" : "Current Draft",
			player: de ? "Spieler" : "Player"
		};
		Object.keys(labels).forEach(function (key) {
			$("[data-i18n='" + key + "']").text(labels[key]);
		});
		$("#resultHeaderL").text(de ? "Pokemon 1: Attacken" : "Pokemon 1's Moves");
		$("#resultHeaderR").text(de ? "Pokemon 2: Attacken" : "Pokemon 2's Moves");
		$("label[for='one-vs-one']").text(de ? "Eins gegen Eins" : "One vs One");
	}

	function fillPlayerSelects() {
		var players = getPlayers();
		$(".schwalboga-draft-player").each(function (index) {
			var side = $(this).data("side");
			var current = playerBySide[side] || (players[index] && players[index].name) || (players[0] && players[0].name) || "";
			playerBySide[side] = current;
			$(this).empty();
			players.forEach(function (player) {
				$("<option>").val(player.name).text(player.name).prop("selected", player.name === current).appendTo(this);
			}, this);
		});
	}

	function selectInitialDraftPokemon(side) {
		var selector = $("#" + side + " .set-selector");
		var option = getDraftOptions(side)[0];
		if (!selector.length || !option) return;
		selector.select2("data", option);
		selector.trigger("change");
	}

	function getSelectedPokemonName(pokeInfo) {
		var data = pokeInfo.find(".set-selector").select2("data");
		if (data && data.pokemon) return data.pokemon;
		var text = pokeInfo.find(".set-selector").val() || "";
		return text.indexOf(" (") > -1 ? text.substring(0, text.indexOf(" (")) : text;
	}

	function getDexEntry(pokemonName) {
		return pokemonEntryByKey[normalizeText(pokemonName)] || null;
	}

	function rememberOriginalOptions(select) {
		if (!select.data("schwalbogaOriginalOptions")) {
			select.data("schwalbogaOriginalOptions", select.children("option").clone());
		}
	}

	function restoreOriginalOptions(select) {
		rememberOriginalOptions(select);
		select.empty().append(select.data("schwalbogaOriginalOptions").clone());
	}

	function collectMoveOptions() {
		moveOptionByKey = {};
		$("select.move-selector option").each(function () {
			var value = $(this).val();
			if (value) moveOptionByKey[normalizeText(value)] = value;
		});
	}

	function getDexAbilities(entry) {
		var abilities = [];
		if (Array.isArray(entry && entry.abilityDetails)) {
			entry.abilityDetails.forEach(function (ability) {
				if (ability && ability.name && abilities.indexOf(ability.name) === -1) abilities.push(ability.name);
			});
		}
		if (!abilities.length && entry && entry.abilities) {
			Object.keys(entry.abilities).forEach(function (slot) {
				var abilityName = entry.abilities[slot];
				if (abilityName && abilities.indexOf(abilityName) === -1) abilities.push(abilityName);
			});
		}
		return abilities;
	}

	function getDexMoves(entry) {
		if (!entry || !entry.learnset) return [];
		return Object.keys(entry.learnset)
			.map(function (moveId) { return moveOptionByKey[normalizeText(moveId)]; })
			.filter(function (moveName, index, list) { return moveName && list.indexOf(moveName) === index; })
			.sort();
	}

	function filterNativeSelect(select, allowedValues, fallback) {
		var current = select.val();
		var allowed = {};
		allowedValues.forEach(function (value) { allowed[value] = true; });
		restoreOriginalOptions(select);
		select.children("option").each(function () {
			var value = $(this).val();
			if (value !== fallback && !allowed[value]) $(this).remove();
		});
		if (current && select.children("option").filter(function () { return $(this).val() === current; }).length) {
			select.val(current);
		} else {
			select.val(allowedValues[0] || fallback);
		}
	}

	function applyDexOptionLimits(pokeInfo) {
		var entry = getDexEntry(getSelectedPokemonName(pokeInfo));
		if (!entry) return;
		var abilities = getDexAbilities(entry);
		var moveNames = getDexMoves(entry);
		filterNativeSelect(pokeInfo.find("select.ability"), abilities, "");
		pokeInfo.find("select.move-selector").each(function () {
			filterNativeSelect($(this), moveNames, "(No Move)");
			$(this).trigger("change");
		});
		pokeInfo.find("select.ability").trigger("change");
	}

	function applyAllDexOptionLimits() {
		$(".poke-info").each(function () {
			applyDexOptionLimits($(this));
		});
	}

	function refreshPokemonSelectors() {
		if (typeof window.loadDefaultLists === "function") {
			window.loadDefaultLists();
		}
		if (sourceMode === "draft") {
			selectInitialDraftPokemon("p1");
			selectInitialDraftPokemon("p2");
		}
	}

	function setSourceMode(mode) {
		sourceMode = mode === "draft" ? "draft" : "all";
		$(".schwalboga-calc-tab").each(function () {
			var active = $(this).data("calcSource") === sourceMode;
			$(this).toggleClass("is-active", active).attr("aria-selected", active ? "true" : "false");
		});
		$(".schwalboga-draft-player-field").prop("hidden", sourceMode !== "draft");
		refreshPokemonSelectors();
	}

	function init() {
		buildPokemonNameMap();
		applyTheme();
		applyTranslations();
		fillPlayerSelects();
		collectMoveOptions();
		$(".schwalboga-calc-tab").on("click", function () {
			setSourceMode($(this).data("calcSource"));
		});
		$(".schwalboga-draft-player").on("change", function () {
			var side = $(this).data("side");
			playerBySide[side] = $(this).val();
			refreshPokemonSelectors();
			if (sourceMode === "draft") selectInitialDraftPokemon(side);
		});
		$(".set-selector").on("select2-opening select2-focus focus", function () {
			activeSelectorSide = $(this).closest(".poke-info").prop("id") || activeSelectorSide;
		});
		$(".set-selector").on("change", function () {
			applyDexOptionLimits($(this).closest(".poke-info"));
		});
		applyAllDexOptionLimits();
		window.addEventListener("storage", function (event) {
			if (event.key === themeStorageKey) applyTheme();
			if (event.key === languageStorageKey) {
				applyTranslations();
				refreshPokemonSelectors();
				applyAllDexOptionLimits();
			}
		});
	}

	window.SCHWALBOGA_CALC = {
		filterSetOptions: filterSetOptions,
		formatSetOption: formatSetOption,
		getInitialSetOption: getInitialSetOption
	};

	$(function () {
		setTimeout(init, 0);
	});
})();
