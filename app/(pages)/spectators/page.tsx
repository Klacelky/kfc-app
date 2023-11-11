import T from '@/utils/i18n/t';

export default function SpectatorsPage() {
    return (
        <>
            <h1>
                <T sk="Pre divákov" en="Spectators" />
            </h1>
            <section>
                <h2>
                    <T sk="Stream" en="Stream" />
                </h2>
                <p>
                    <T
                        sk={
                            <>
                                Aby sme hráčom dopriali priestor na hranie a keďže okolo stola nie je veľa miesta pre
                                divákov, zápasy play-off budú live streamované na telke v spoločenskej miestnosti hneď
                                veďla kalčeta a online, aby ste pri sledovaní neprišli o atmosféru a emócie.
                            </>
                        }
                        en={
                            <>
                                In order to give the players room to play and since there is not much space around the
                                table for spectators, the playoff games will be live-streamed on the TV in the TV room
                                right next to the table and online, so that you don{"'"}t miss the atmosphere and
                                emotions while watching.
                            </>
                        }
                    />
                </p>
                <p>
                    <T sk="Link na stream neskôr nájdeš tu." en="You can find the link to the stream later here." />
                </p>
                <p>
                    <T
                        sk={
                            <>
                                Skupinové zápasy streamované nebudú. Ak sa chcete prísť pozrieť na nejaký skupinový
                                zápas dohodnite sa s hráčmi.
                            </>
                        }
                        en={
                            <>
                                Group matches will not be streamed. If you want to come and watch a group match, please
                                ask players if they don’t mind.
                            </>
                        }
                    />
                </p>
            </section>
            <section>
                <h2>
                    <T sk="Cena Bc. Petra Burdu" en="Bc. Peter Burda award" />
                </h2>
                <p>
                    <T
                        sk={
                            <>
                                Na vaše želanie a motivovanie nie tak skúsených hráčov sme sa inšpirovali KFO a rovnako
                                zavedieme cenu Bc. Petra Burdu. Cenu získa tím, ktorý skončí v celom turnaji s najmenej
                                bodmi a najhorším skóre. Cenu už tradične odovzdá sám Bc. Peter Burda prostredníctvom
                                online spojenia. Cenou bude vopred nešpecifikovaný alkoholický výrobok.
                            </>
                        }
                        en={
                            <>
                                At your request and to motivate the not so experienced players, we have taken
                                inspiration from KFO and will be introducing the Bc. Peter Burda award. The award will
                                be awarded to the team that finishes with the fewest points and the worst score in the
                                entire tournament. The prize will traditionally be presented by Bc. Peter Burda. The
                                award will be an unspecified alcoholic product.
                            </>
                        }
                    />
                </p>
                <p>
                    <T
                        sk={
                            <>
                                Poznámka od organizátorov: Pokiaľ budú 2 tímy (najhoršie) so zhodným skóre, rozhodovať
                                bude vzájomný zápas medzi týmito tímami, má to však háčik, cenu získa výherný z týchto
                                dvoch tímov, porazeným zostane iba hanba, že sú horší, ako najhorší. Predpokladáme, že
                                takáto situácia nenastane, ale pokiaľ áno, nech je z toho aspoň trochu sranda.
                            </>
                        }
                        en={
                            <>
                                Note from the organizers: if there are 2 teams (worst) with identical scores, the match
                                between these teams will be decided. But there is a catch, the prize will go to the
                                winning of these two teams, the losers will be left with only the shame of being worse
                                than the worst. We don{"'"}t expect that situation to arise, but if it does, let{"'"}s
                                make it at least a little fun.
                            </>
                        }
                    />
                </p>
            </section>
            <section>
                <h2>
                    <T sk="Cena pre naj strelca a Zlatý Jožo" en="The MVP award and “Zlatý Jožo” (The Golden Joe)" />
                </h2>
                <p>
                    <T
                        sk={
                            <>
                                Nebudú chýbať ani individuálne ocenenia. V pláne máme novinku, a to je cena pre hráča,
                                ktorý počas play-off strelí najrýchlejší gól (nie v sekundách ale m/s!). Ako to spravíme
                                sa nechajte prekvapiť. Pre prípad, že sa nám to nepodarí tak, ako plánujeme, cenu naj
                                strelca získa najproduktívnejší hráč.
                            </>
                        }
                        en={
                            <>
                                There will be no shortage of individual awards either. We are planning a new one and
                                that is an award for the player who scores the fastest goal during the play-off (not in
                                seconds but m/s!). How will we do it? It is a surprise. In case it doesn{"'"}t go as we
                                plan, the most productive player will get the MVP award.
                            </>
                        }
                    />
                </p>
            </section>
        </>
    );
}
