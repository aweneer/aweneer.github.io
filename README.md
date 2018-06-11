# Semestrální práce do předmětu B0B39KAJ (Klientské aplikace v Javascriptu) - BouncyBall
# Autor: Jan Hlaváč


## Cíl projektu

Cílem projektu je vytvořit single page aplikaci, v tomto případě 2D hru využívající technologie HTML5, Javascript a CSS. Téma hry je odvozeno z již existující hry https://cs.wikipedia.org/wiki/Arkanoid. Tato hra je poměrně jednodušší, ale základní princip hry je stejný, odrazit míček od pálky tak, aby míček zničil všechny bloky na herní ploše.

## Dostupnost aplikace

Online na webu https://honza999.github.io

## Postup

Téma jsem zvolil, protože se mi koncept této hry vcelku líbil a myslel jsem si, že herní logika nebude až tak složitá.

Jako první jsem se letmo seznámil s knihovnou React, abych si usnadnil tvorbu jednotlivých stránek pomocí jejích komponent. Když byl základ hotový, přidal jsem do komponent některé potřebné elementy (např. <audio>) a hlavně je mezi sebou propojil, přešel jsem k samotnému programování herní logiky uvnitř canvasu.

Obsluhovat canvas a sepsat onu logiku dalo značné množství práce, např. napojení React komponenty na JS třídu, která tvoří herní plátno, aby se dalo vykreslování snadno ovládat (přechod na jinou stránku - přerušení hry (renderování).

Herní logika funguje na principu vytoření nové instance třídy (základní, nebo rozšířené (prototypová dědičnost)), na kterou se zavolá spouštěcí metoda, která zavolá hlavní metodu třídy, která vystaví celou logiku. Uvnitř této funkce jsou deklarovány jak hlavní vykreslovací funkce, tak pomocné funkce pro kreslení, detekci kolize, zápis statistik nebo zpracování událostí. Po deklaraci těchto metod se nastaví potřebné proměnné, vytvoří se ničitelné bloky (objekty).
Poté se zavolá metoda drawBoard(), která spustí kompletní vykreslení. Na začátku vykreslí jednotlivé canvas elementy (míč, bloky, pálku a textové tagy), zkontroluje kolizi a v závislosti na podmínkách posouvá míček dál, případně mění proměnné (např. skóre, životy, ...)
V určitých konečných momentech se zapisují statistiky do LocalStorage.

V poslední řadě jsem zpracoval CSS celé aplikace, kde jsem se snažil vzhled stylizovat tak, aby byl fixní a nepříliš křiklavý barevně.


## Základní popis funkčnosti

Po načtení hlavní stránky aplikace je zobrazena pouze navigace v horní části obrazovky a footer. K jednotlivým stránkám lze přistoupit pomocí odkazl v navigaci. Na tyto odkazy je aplikována CSS animace.

Bez vytvořeného profilu lze volně prohlížet pouze stránku s nastavením Controls a stránku About, zbylé tři stránky nutí uživatele vytvořit si profil, který se pak ukládá v LocalStorage. Po validaci vstupu je profil vytvořen a uživatel může začít hrát, prohlédnout statistiky, nebo změnit jméno profilu či profil smazat.

Stránka s hrou načte canvas a čeká se na interakci uživatele, aby se míček rozpohyboval. Pohyb doleva/doprava pomocí šipek na klávesnici započne hru.

Hra má dva módy, ke kterým lze přistoupit pomocí odkazu nad canvas plochou. Hardmore rozšiřuje funkcionalitu základního módu pomocí prototypové dědičnosti uvnitř třídy (vazba extends).

Během hry se zapisují do proměnných určité úkony, které se hráči povedlo uskutečnit: smrt, zničení bloku, výhra, ... Po skončení hry jsou statistiky zapsány do LocalStorage.

Na pozadí hry hraje hudba, kterou lze kdykoliv přerušit na stránce Controls, nicméně zvuky ničení a při výhře jsou vynucené, stejně tak jako hudba v hardmódu, a tak je vypnout nejde.


## Ve složce /src jsou uloženy původní zdrojové soubory, které byly před buildingem aplikace, která běží na doméně https://honza999.github.io/

## Kde najít body hodnocení
### Povinné body
Sémantické značky - viz. skoro každá komponenta  
Porkočilé selektory - viz. styles.css  
CSS animace - navigace (menu) v horní části obrazovky po najetí kurzoru  
OOP (dědičnost) - pomocí dvou tříd a klíč. slova extends, funkcionalita navíc  
Pokročilé JS API - několikrát použitý LocalStorage  
### Další body
Cross-browser kompatibilita - zkoušeno  
Grafika (Canvas) - komponenta Game a HardGame, s Canvasem pracuje GameBoard a jeho potomek  
Média (Audio) - hudba na pozadí, v komponentě MusicPlayer, skryté pomocí CSS, a vypíná se na stránce (komponentě) Controls  
Formulářové prvky - komponenta Profile, validace a atributy  
Offline aplikace - funguje offline, upozornění ale přijde vždy (viz JS offline)  
Vendor prefixy - několikrát v souboru se styly, a tam hlavně u CSS animace  
Framework/Knihovna - aplikace je v Reactu  
Funkční historie - stará se o to React Router  
Ovládání médií - třída GameBoard vytváří new Audio(...), které poté uvnitř svých funkčí spouští dle příležitosti  
Offline aplikace (JS) - při odpojení od sítě vyskočí okno s upozorněním  
