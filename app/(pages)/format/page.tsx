import Link from 'next/link';

export default function FormatPage() {
    return (
        <>
            <h1>Formát</h1>
            <section>
                <h2>Registrácia</h2>
                <p>
                    Svoj tím (hrá sa 2v2, teda dvojicu) do turnaja prihlásiš tak
                    isto, ako si zvyknutý z KFO, komentárom pod príspevok, ktorý
                    nájdeš{' '}
                    <Link
                        href="https://www.facebook.com/events/227964476781108"
                        target="_blank"
                        className="link"
                    >
                        v udalosti na Facebooku
                    </Link>
                    .
                </p>
                <p>Štartovné na osobu je 50 Kč teda 100 Kč za tím.</p>
                <p>
                    Turnaj je určený primárne pre súčasných a bývalých
                    rezidentov koleje. Pri prípadnej nízkej účasti bude otvorená
                    druhá vlna registrácie pre ostatných.
                </p>
            </section>
            <section>
                <h2>Žrebovanie skupín</h2>
                <p>
                    Veľkosť skupín aj spôsob ich žrebovania bude upresnený po
                    uzavretí registrácie na základe účasti. Pravdepodobne
                    podobný štýl ako na KFO, t.j. live žreb s dvoma košmi.
                </p>
            </section>
            <section>
                <h2>Skupinové zápasy</h2>
                <p>
                    Po rozlosovaní skupín (9.11. 20.00) majú tímy týždeň (10.11.
                    - 17.11.) na to, aby odohrali svoje skupinové zápasy. V
                    skupine hrá každý s každým BO3, teda najlepší z troch
                    zápasov. Dátumy a časy zápasov si tímy dohodnú individuálne
                    so svojimi skupinovými súpermi. Kalčeto máme len jedno,
                    preto ak sa dohodnete na nejakom čase a termíne spravte si
                    prosím na zápas rezervačku v tomto zdieľanom kalendári
                    (TODO), aby ostatné tými vedeli kedy je stôl obsadený. Okrem
                    termínu si vybavte na zápas ambasadora (niekoho, kto bude
                    zapisovateľ, v prípade potreby rozhodca a odovzdá výsledky
                    organizátorom). Prázdny záznam o stretnutí nájdete tu (TODO)
                    alebo vytlačený v spoločenskej miestnosti.
                </p>
            </section>
            <section>
                <h2>Play-Off</h2>
                <p>
                    Vyraďovacie zápasy sa odohrajú 18.11. (sobota). Pavúk,
                    formát (BO?) a presný harmonogram bude zverejnený po
                    uzavretí registrácie (8.11.) podľa počtu prihlásených tímov.
                </p>
            </section>
        </>
    );
}
