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
                                zápasov. Dátumy a časy zápasov si tímy dohodnú individuálne so svojimi skupinovými
                                súpermi. Každej skupine spravíme na dohadovanie messenger skupinu v ktorej budeme aj my
                                aby sme na to dohliadli a vyriešili prípadné problémy.
                            </>
                        }
                        en={
                            <>
                                After the groups are drawn (9.11. 20.00), teams have one week (10.11.-17.11.) to play
                                their group matches. In the groups, teams play each other BO3, i.e. best of three
                                matches. The teams will arrange the dates and times of the matches individually with
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
        </>
    );
}
