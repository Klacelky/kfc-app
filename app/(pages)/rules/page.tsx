import T from '@/utils/i18n/t';

export default function RulesPage() {
    return (
        <>
            <h1>
                <T sk="Pravidlá" en="Rules" />
            </h1>
            <p>
                <T
                    sk={
                        <>
                            Ktorí hrávate, poznáte ako sa to u nás hráva. V prípade nejasností kontaktujte
                            organizátorov.
                        </>
                    }
                    en={
                        <>
                            If you are part of the local foosball community, you know how we play. If you are unsure,
                            please contact the organizers.
                        </>
                    }
                />
            </p>
            <section>
                <h2>
                    <T sk="Dôležité" en="Important" />
                </h2>
                <ul className="list-disc ml-5">
                    <li>
                        <strong>
                            <T sk="Gól „z prvej“ neplatí!" en="Goal “from the first touch” is not valid!" />
                        </strong>{' '}
                        <T
                            sk={
                                <>
                                    („z prvej“ = po vhodení padne gól po jedinom dotyku lopty s hráčom, teč sa počíta
                                    ako dotyk).
                                </>
                            }
                            en={
                                <>
                                    (“from the first touch” = a goal is scored after the ball has made contact with one
                                    player only, redirection counts as a touch).
                                </>
                            }
                        />
                    </li>
                    <li>
                        <strong>
                            <T
                                sk="Post útočník/obranca nie je pevne určený"
                                en="The striker/defender position is not fixed"
                            />
                        </strong>
                        <T
                            sk=", hráči v tíme sa môžu kedykoľvek vymeniť."
                            en=", players in the team can switch at any time during the match."
                        />
                        .
                    </li>
                    <li>
                        <strong>
                            <T sk="Ak nikto nedosiahne na loptu" en="If no one can reach the ball" />
                        </strong>{' '}
                        <T
                            sk={
                                <>
                                    , vhoďte novú, ak lopta zastala medzi bielimia modrými hráčmi. Inak si ju obranca
                                    môže posunúť.
                                </>
                            }
                            en={
                                <>
                                    , throw in a new ball if the ball is stuck between the white and blue players.
                                    Otherwise the defender can give it a touch to move it slightly.
                                </>
                            }
                        />
                    </li>
                    <li>
                        <strong>
                            <T
                                sk="Ak lopta vyskočí z brány, hrá sa ďalej, kým nepadne normálny gól."
                                en="If the ball pops out of the goal, the play continues until a normal goal is scored."
                            />
                        </strong>
                        <T
                            sk={
                                <>
                                    Vyskočený gól sa počíta ako -1 pre stranu, ktorá ho inkasovala. Skóre za vyskočené
                                    góly sa odpočíta po padnutí normálneho gólu, ktorý je klasicky za +1 pre stranu,
                                    ktorá skórovala.
                                </>
                            }
                            en={
                                <>
                                    A pop-out goal counts as -1 for the side that received it. The score for pop-out
                                    goals is updated after a normal goal is scored, which is as usual +1 for the
                                    attacking side.
                                </>
                            }
                        />
                        <ul className="list-disc ml-5">
                            <li>
                                <em>
                                    <T sk="Príklad 1:" en="Example 1:" />
                                </em>{' '}
                                <T
                                    sk={
                                        <>
                                            Bieli strelia vyskočený gól, hrá sa ďalej, modrí strelia gól = skóre sa
                                            nemení.
                                        </>
                                    }
                                    en={
                                        <>
                                            White scores a pop-up goal, play continues, Blue scores a goal = score does
                                            not change.
                                        </>
                                    }
                                />
                            </li>
                            <li>
                                <em>
                                    <T sk="Príklad 2:" en="Example 2:" />
                                </em>{' '}
                                <T
                                    sk={
                                        <>
                                            Bieli strelia dva vyskočené góly po sebe, bieli strelia gól = bieli +1,
                                            modrý -2.
                                        </>
                                    }
                                    en={
                                        <>
                                            White scores two pop-up goals in a row, White scores a goal = White +1, Blue
                                            -2
                                        </>
                                    }
                                />
                            </li>
                            <li>
                                <em>
                                    <T sk="Príklad 3:" en="Example 3:" />
                                </em>{' '}
                                <T
                                    sk={
                                        <>Bieli a po nich modrí, strelia vyskočený gól, bieli strelia gól = modrí -1.</>
                                    }
                                    en={
                                        <>
                                            White scores a pop-up goal followed by Blue as well, White scores a goal =
                                            Blue -1
                                        </>
                                    }
                                />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <T
                            sk={
                                <>
                                    Podliezanie nie je povinné, aby sme neodradili nováčikov, ostrieľaným kalčetistom to
                                    ale určite tak ľahko neprejde 😉.
                                </>
                            }
                            en={
                                <>
                                    Crawling under the table after losing without scoring a goal is not compulsory, so
                                    as not to discourage new players, but experienced veterans will certainly not get
                                    away with it 😉.
                                </>
                            }
                        />
                    </li>
                </ul>
            </section>
            <section>
                <h2>
                    <T sk="Čo nerobiť" en="What not to do!" />
                </h2>
                <p>
                    <T
                        sk="Dúfame, že túto časť sem dávame zbytočne, ale istota je guľomet."
                        en="We hope we're putting this part here unnecessarily, but just to make sure."
                    />
                </p>
                <ul className="list-disc ml-5">
                    <li>
                        <strong>
                            <T sk="Negrilujeme!" en="Do not grill!" />
                        </strong>{' '}
                        <T
                            sk={
                                <>
                                    Netočíme panáčikmi ako zmyslov zbavení, definícia grilovania pre matematikov a
                                    právnikov: panáčik spraví 360° otočku pred tým, než trafí loptu.
                                </>
                            }
                            en={
                                <>
                                    We don{"'"}t spin the players like crazy, the definition of grilling for
                                    mathematicians and lawyers: the player does a 360° spin before it hits the ball.
                                </>
                            }
                        />
                    </li>
                    <li>
                        <strong>
                            <T sk="Nehýbeme stolom!" en="Do not move the table!" />
                        </strong>{' '}
                        <T
                            sk={
                                <>
                                    Áno, kalčeto sú emócie! Skúsme ich ale kontrolovať, aby sme mali na čom hrať aj
                                    nabudúce.
                                </>
                            }
                            en={
                                <>
                                    Yes, there are a lot of emotions in the play! But let{"'"}s try to control them, so
                                    we have something to play on next time.
                                </>
                            }
                        />
                    </li>
                    <li>
                        <strong>
                            <T sk="Neovplyvňujeme pohyb lopty!" en="Do not influence ball movement!" />
                        </strong>{' '}
                        <T sk="(rukou ani fúkaním)!" en="(by hand or blowing)!" />
                    </li>
                    <li>
                        <strong>
                            <T sk="Nechytáme tyče protihráčov!" en="Do not touch your opponent's sticks!" />
                        </strong>
                    </li>
                </ul>
                <p>
                    <T
                        sk={
                            <>
                                Ak sa hráč dopustí jedného z týchto prestupkov, v rámci fair-play odovzdá loptu
                                súperovi.
                            </>
                        }
                        en={
                            <>
                                If a player breaks one of these rules, they will pass the ball to the opponent as a fair
                                play.
                            </>
                        }
                    />
                </p>
            </section>
            <section>
                <h2>
                    <T sk="Fair-play" en="Fair-play!" />
                </h2>
                <p>
                    <T
                        sk={
                            <>
                                Nie sú to majstrovstvá sveta, ale priateľský turnaj v rámci našej Klácelkovskej kalčeto
                                komunity. Pravidlá majú pár bodov, nie strán a určite nepokrývajú každú situáciu ktorá
                                môže potenciálne nastať. Pevne veríme, že ak takáto neočakávaná situácia nastane,
                                zainteresovaní situáciu rozumne vyriešia.
                            </>
                        }
                        en={
                            <>
                                This is not a world championship but a friendly tournament within our local foosball
                                community. The rules have a few points, not pages, and certainly don{"'"}t cover every
                                situation that could potentially arise. We firmly believe that if such an unexpected
                                situation arises, those involved will resolve the situation reasonably.
                            </>
                        }
                    />
                </p>
                <p>
                    <T
                        sk="…pre prípad, že nie, organizátori si vyhradzujú právo rozhodnúť podľa seba 😀."
                        en="…in case they don't, the organizers reserve the right to decide 😀."
                    />
                </p>
            </section>
        </>
    );
}
