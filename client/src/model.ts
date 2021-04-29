
export interface KriterijumIzbora {
    idKriterijuma: number,
    naziv: string
}
export interface OrganizacionaJedinica {
    sifraOJ: number,
    naziv: string,
    rukovodi: Radnik
}
export interface Radnik {
    sifraRadnika: number,
    ime: string,
    prezime: string,
    status: 'u izradi' | 'aktivan' | 'pasivan',
    radi: OrganizacionaJedinica,
    pripada: OrganizacionaJedinica,
    rukovodi?: OrganizacionaJedinica

}
export interface Ponudjac {
    maticniBroj: string,
    pib: string,
    datum: Date,
    naziv: string
}
export interface TehnickaDokumentacija {
    idTD: number,
    datum: Date,
    opis: string
}
export interface PredlogOFormiranjuKomisije {
    sifraPFK: number,
    datum: Date,
    opis: string
}
export interface PredlogOPokretanjuPostupka {
    sifraPPP: number,
    datum: Date,
    opis: string
}
export interface ResenjeOFK {
    radnik: Radnik,
    datumRFK: Date,
    potpis: string,
    predlog: PredlogOFormiranjuKomisije
}
export interface ResenjeOPP {
    radnik: Radnik,
    datumRPP: Date,
    potpis: string,
    predlog: PredlogOPokretanjuPostupka
}
export interface JavniPoziv {
    idJavnogPoziva: number,
    datum: Date,
    sabloni: string,
    status: 'kreiran' | 'izmenjen' | 'poslat',
    ima: Radnik,
    sadrzi: KriterijumIzbora,
    resenje: ResenjeOPP,
    konkursneDokumentacija: KonkursnaDokumentacija[];

}
export interface KonkursnaDokumentacija {
    sifraKD: number,
    rok: Date,
    obavezanElement: string,
    sadrzi: TehnickaDokumentacija,
    obrisan?: boolean,
    javniPoziv: JavniPoziv,
    resenje: ResenjeOFK,
    nacini: NacinDostavljanjaPonude[]
}
export interface NacinDostavljanjaPonude {
    rb: number,
    adresa: string,
    opis: string,
    obrisan?: boolean,
    dokumentacija: KonkursnaDokumentacija
}
export interface Prima {
    ponudjac: Ponudjac,
    javniPoziv: JavniPoziv

}