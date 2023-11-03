export default function RulesPage() {
    return (
        <>
            <h1>Pravidlá</h1>
            <p>
                Ktorí hrávate, poznáte ako sa to u nás hráva. V prípade
                nejasností kontaktujte organizátorov.
            </p>
            <section>
                <h2>Dôležité</h2>
                <ul className="list-disc ml-5">
                    <li>
                        <strong>Gól „z prvej“ neplatí!</strong> („z prvej“ = po
                        vhodení padne gól po jedinom dotyku lopty s hráčom, teč
                        sa počíta ako dotyk).
                    </li>
                    <li>
                        <strong>
                            Post útočník/obranca nie je pevne určený
                        </strong>
                        , hráči v tíme sa môžu kedykoľvek vymeniť.
                    </li>
                    <li>
                        <strong>Ak nikto nedosiahne na loptu</strong>, vhoďte
                        novú, ak lopta zastala medzi červenými a modrými hráčmi,
                        inak si ju obranca môže posunúť.
                    </li>
                    <li>
                        <strong>
                            Ak lopta vyskočí z brány, hrá sa ďalej, kým nepadne
                            normálny gól.
                        </strong>
                        Vyskočený gól sa počíta ako -1 pre stranu, ktorá ho
                        inkasovala. Skóre za vyskočené góly sa odpočíta po
                        padnutí normálneho gólu, ktorý je klasicky za +1 pre
                        stranu, ktorá skórovala.
                        <ul className="list-disc ml-5">
                            <li>
                                <em>Príklad 1</em>: Červení strelia vyskočený
                                gól, hrá sa ďalej, modrí strelia gól = skóre sa
                                nemení.
                            </li>
                            <li>
                                <em>Príklad 2</em>: Červení strelia dva
                                vyskočené góly po sebe, červení strelia gól =
                                červený +1, modrý -2.
                            </li>
                            <li>
                                <em>Príklad 3</em>: Červení a po nich modrí,
                                strelia vyskočený gól, červení strelia gól =
                                modrí -1.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Podliezanie nie je povinné, aby sme neodradili
                        nováčikov, ostrieľaným kalčetistom to ale určite tak
                        ľahko neprejde 😉.
                    </li>
                </ul>
            </section>
            <section>
                <h2>Čo nerobiť</h2>
                <p>
                    Dúfame, že túto časť sem dávame zbytočne, ale istota je
                    guľomet.
                </p>
                <ul className="list-disc ml-5">
                    <li>
                        <strong>Negrilujeme!</strong> Netočíme panáčikmi ako
                        zmyslov zbavení, definícia grilovania pre matematikov a
                        právnikov: panáčik spraví 360° otočku pred tým, než
                        trafí loptu.
                    </li>
                    <li>
                        <strong>Nehýbeme stolom!</strong> Áno, kalčeto sú
                        emócie! Skúsme ich ale kontrolovať, aby sme mali na čom
                        hrať aj nabudúce.
                    </li>
                    <li>
                        <strong>Neovplyvňujeme pohyb lopty!</strong>
                        (rukou ani fúkaním)!
                    </li>
                    <li>
                        <strong>Nechytáme tyče protihráčov!</strong>
                    </li>
                </ul>
                <p>
                    Ak sa hráč dopustí jedného z týchto prestupkov, v rámci
                    fair-play odovzdá loptu súperovi.
                </p>
            </section>
            <section>
                <h2>Fair-play</h2>
                <p>
                    Nie sú to majstrovstvá sveta, ale priateľský turnaj v rámci
                    našej Klácelkovskej kalčeto komunity. Pravidlá majú pár
                    bodov, nie strán a určite nepokrývajú každú situáciu ktorá
                    môže potenciálne nastať. Pevne veríme, že ak takáto
                    neočakávaná situácia nastane, zainteresovaní situáciu
                    rozumne vyriešia.
                </p>
                <p>
                    …pre prípad, že nie, organizátori si vyhradzujú právo
                    rozhodnúť podľa seba 😀.
                </p>
            </section>
        </>
    );
}
