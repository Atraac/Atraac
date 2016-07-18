# DeliverIT
## Portal społecznościowy do transportu paczek
### Projekt zespołowy, INT Wydział Elektroniki, Politechnika Wrocławska, 2016

Znajdujący się w repozytorium serwis to część webowa projektu składającego się z trzech części:
* Aplikacja Internetowa
  * Maciej Lewiński, Michał Zawadzki
* Aplikacja Android
  * Maciej Walaszczyk, Mateusz Galik
* Serwer REST
  * Karol Niziałek, Daniel Skupień
  
Strona została wykonana przy użyciu frameworków:
* AngularJS
* Semantic UI

Projekt realizowany był w porozumieniu z firmą [Capgemini](https://www.pl.capgemini.com/).

Demo dostępne [tutaj](http://deliverit.netlify.com/#/)
UWAGA! Serwer RESTowy ze względu na wykonanie w języku Java stoi na jedynym darmowym serwerze jaki udało się nam znaleźć i dosyć często jest on nieaktywny.

Demo aplikacji Android można znaleźć w sklepie Google Play pod nazwą "DeliverIT".

### Główne założenia projektu
Celem projektu jest dostarczenie aplikacji na platformę Android lub iOS, która umożliwia użytkownikom umawianie się z innymi osobami w celu wysłania i dostarczenia przesyłki/paczki.

Zarejestrowani użytkownicy portalu publikują informacje na temat podróży, jaką będą odbywać oraz o rodzajach paczek (np. list, mała paczka, duża paczka o danych wymiarach), jakie mogą dostarczyć do adresatów. Ponadto kierowca/kurier zaznacza, do jakich miejscowości znajdujących się na trasie może dostarczyć przesyłkę. Zainteresowana osoba zgłasza się do potencjalnego kuriera, aby umówić się na dostarczenie przesyłki.

Transport każdej z paczek kosztuje określoną kwotę. Kurier może dostarczyć paczkę bezpośrednio do adresata (za dodatkową opłatą), bądź umówić się z odbiorcą w danym miejscu, aby nie zbaczać z trasy.

Dodatkowo kurier może udostępniać swoje położenie przy pomocy GPS tak, aby nadawca oraz odbiorca paczki mogli na bieżąco monitorować status paczki oraz potencjalny czas oczekiwania. Ponadto aplikacja kuriera może automatycznie wysyłać powiadomienia/alerty (działające w obrębie aplikacji) lub/i smsy, aby poinformować zainteresowanych o postępie podróży. Użytkownicy mogą się wzajemnie oceniać oraz dodawać komentarze na temat współpracy.

Aplikacja mobilna ma być dedykowana na system Android lub iOS(Windows Phone pomijamy z powodu znikomego(2,6%) udziału w rynku), natomiast strona backendowa może zostać zaimplementowana przy użyciu frameworków języka Java (np. Spring).
