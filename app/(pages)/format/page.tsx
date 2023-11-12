import T from '@/utils/i18n/t';
import { FB_EVENT, RESERVATION_EN, RESERVATION_SK } from '@/utils/links';
import Link from 'next/link';

export default function FormatPage() {
    return (
        <>
            <h1>
                <T sk="Formát" en="Form" />
            </h1>
            <section>
                <h2>
                    <T sk="Registrácia" en="Registration" />
                </h2>
                <p>
                    <T
                        sk={
                            <>
                                Svoj tím (hrá sa 2v2, teda dvojicu) do turnaja prihlásiš tak isto, ako si zvyknutý z
                                KFO, komentárom pod príspevok, ktorý nájdeš
                            </>
                        }
                        en={
                            <>
                                You enrol your team (playing 2v2, i.e. a pair) in the tournament as you are used to from
                                KFO, by commenting below the post you find
                            </>
                        }
                    />{' '}
                    <Link href={FB_EVENT} target="_blank" className="link">
                        <T sk="v tejto udalosti na Facebooku" en="in this Facebook event" />
                    </Link>
                    .
                </p>
                <p>
                    <T
                        sk={
                            <>
                                Štartovné na osobu je 50 Kč teda 100 Kč za tím. Štartovné pošlite na účet
                                123-8341390277/0100 (CZ1301000001238341390277) alebo prineste na izbu 315.
                            </>
                        }
                        en={
                            <>
                                Entry fee per person is 50 CZK, so 100 CZK per team. Please send it to
                                123-8341390277/0100 (CZ1301000001238341390277) or bring it to the room 315.
                            </>
                        }
                    />
                </p>
                <p>
                    <T
                        sk={
                            <>
                                Turnaj je určený primárne pre súčasných a bývalých rezidentov koleje. Pri prípadnej
                                nízkej účasti bude otvorená druhá vlna registrácie pre ostatných.
                            </>
                        }
                        en={
                            <>
                                The tournament is primarily for current and former dorm residents. In the event of a low
                                turnout, a second wave of registration will be opened for others.
                            </>
                        }
                    />
                </p>
            </section>
            <section>
                <h2>
                    <T sk="Žrebovanie skupín" en="Group draw" />
                </h2>
                <p>
                    <T
                        sk={
                            <>
                                Žrebovanie skupín prebehne 9.11. o 20.00 v spoločenskej miestnosti. Prihlásené tímy sú
                                rozdelené do štyroch košov (I-IV). Do každej zo štyroch skupín (A-D) bude vyžrebovaný
                                jeden tím z každého koša.
                            </>
                        }
                        en={
                            <>
                                Group drawings will be held on Nov. 9 at 8 p.m. in the TV Room. Registered teams are
                                divided into four baskets (I-IV). One team from each basket will be drawn into each of
                                the four groups (A-D).
                            </>
                        }
                    />
                </p>
                <p>
                    <T
                        sk={
                            <>
                                Poznámka od organizátorov: Keďže nemáme žiadny oficiány kalčeto rebríček, rozdelenie
                                tímov do košov uskutočníme podľa nášho najlepšieho vedomia a svedomia tak, aby boli
                                všetky skupiny čo najvyrovnanejšie.
                            </>
                        }
                        en={
                            <>
                                Note from the organizers: since we have no official foosball ranking, we will divide the
                                teams into baskets to the best of our knowledge to make all groups as equal as possible.
                            </>
                        }
                    />
                </p>
            </section>
            <section>
                <h2>
                    <T sk="Skupinové zápasy" en="Group matches" />
                </h2>
                <p>
                    <T
                        sk={
                            <>
                                Po rozlosovaní skupín (9.11. 20.00) majú tímy týždeň (10.11. - 17.11.) na to, aby
                                odohrali svoje skupinové zápasy. V skupine hrá každý s každým BO3, teda najlepší z troch
                                hier. Dátumy a časy zápasov si tímy dohodnú individuálne so svojimi skupinovými
                                súpermi. Každej skupine spravíme na dohadovanie messenger skupinu v ktorej budeme aj my
                                aby sme na to dohliadli a vyriešili prípadné problémy.
                            </>
                        }
                        en={
                            <>
                                After the groups are drawn (9.11. 20.00), teams have one week (10.11.-17.11.) to play
                                their group matches. In the groups, teams play each other BO3, i.e. best of three
                                games. The teams will arrange the dates and times of the matches individually with
                                their group opponents. We will make a messenger group for each group to arrange this,
                                and we will be in it to supervise and solve any problems.
                            </>
                        }
                    />
                </p>
                <p>
                    <T
                        sk={
                            <>
                                Kalčeto máme len jedno, preto ak sa dohodnete na nejakom čase a termíne spravte si
                                prosím na zápas rezervačku{' '}
                                <Link className="link" href={RESERVATION_SK} target="_blank">
                                    v tomto zdieľanom kalendári
                                </Link>
                                , aby ostatné tými vedeli kedy je stôl obsadený.
                            </>
                        }
                        en={
                            <>
                                We only have one table and there are quite a few matches. If you agree on a time and
                                date please make a reservation for a match{' '}
                                <Link className="link" href={RESERVATION_EN} target="_blank">
                                    in this shared calendar
                                </Link>
                                , so that other teams know when the table is occupied.
                            </>
                        }
                    />
                </p>
                <p>
                    <T
                        sk={
                            <>
                                Pri väčšine zápasov sa budeme snažiť byť osobne. Ak tam ale nebudeme, tak okrem termínu
                                si vybavte na zápas ambasadora (niekoho kto bude zapisovateľ „robiť čiarky“, kto dal
                                koľko gólov, a v prípade potreby rozhodca). Po zápase dovzdá výsledky organizátorom.
                            </>
                        }
                        en={
                            <>
                                For most matches, we will try to be there to supervise. But if we won{"'"}t be there, in
                                addition to the date, please arrange an ambassador (someone keeps track of who scored
                                how many goals and supervises the match. Ideally, someone who knows how the game is
                                played here). After the match, report back to us the results and who scored how many
                                goals.
                            </>
                        }
                    />
                </p>
                <section>
                    <h3>
                        <T sk="Bodovanie" en="Scoring" />
                    </h3>
                    <p>
                        <T
                            sk="Za každý vyhraný zápas (BO3) dostane tím 1 bod."
                            en="For each match won (BO3), the team receives 1 point."
                        />
                    </p>
                    <p>
                        <T
                            sk={
                                <>
                                    Poradie v skupine sa určí primárne podľa počtu bodov (vyhratých zápasov). V prípade
                                    rovnosti bodov rozhoduje výsledok vzájomného zápasu v skupine. V prípade, že takto
                                    vznikne cyklus (tímy A, B, C majú zhodný počet bodov a A vyhralo nad B, B vyhralo
                                    nad C a C vyhralo nad A), rozhoduje rozdiel medzi počtom vyhraných a počtom
                                    prehratých hier vo vzájomných zápasoch týchto troch tímov. Ak je aj tento rozdiel
                                    rovnaký, tak rozhoduje rozdiel medzi počtom strelených a inkasovaných gólov. Ak je
                                    aj tento rozdiel rovnaký, tak poradie bude určené náhodným žrebom.
                                </>
                            }
                            en={
                                <>
                                    The group standings will be determined primarily by the number of points (matches
                                    won). In case of a tie points are equal, the result of the mutual match in the group
                                    is decisive. In the event that this creates a cycle (teams A, B, C have the same
                                    number of points and A wins over B, B wins over C and C wins over A), the
                                    tie-breaker shall be the difference between the number of games won and the number
                                    of games lost between the three teams. If this difference is also the same, the
                                    difference between the number of goals scored and the number of goals scored. If
                                    this difference is also equal, the order will be determined by a random draw.
                                </>
                            }
                        />
                    </p>
                </section>
            </section>
            <section>
                <h2>
                    <T sk="Play-off" en="Play-off" />
                </h2>
                <p>
                    <T
                        sk={
                            <>
                                Vyraďovacie zápasy sa odohrajú 18.11. (sobota). Na rozdiel od skupín si v play-off
                                zahráte BO5 teda najlepší z piatich zápasov. Harmonogram zápasov nájdeš
                            </>
                        }
                        en={
                            <>
                                Play-off games will be played on 18.11. (Saturday). Unlike the groups, the play-off will
                                be played BO5, i.e. best of five games. You can find the schedule
                            </>
                        }
                    />{' '}
                    <Link className="link" href={'/play-off'}>
                        <T sk="na tejto stránke" en="on this page" />
                    </Link>
                    .{' '}
                    <T
                        sk={
                            <>
                                Na každý zápas je vyhradených 30 minút. Keďže kalčeto sa nehrá na čas, hramonogram je
                                orientačný a môžu nastať mierne posuny v časoch zápasov.
                            </>
                        }
                        en={
                            <>
                                There are 30 minutes for each match. As foosball is not played on time, the schedule is
                                approximate and there may be slight shifts in match times.
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
        </>
    );
}
