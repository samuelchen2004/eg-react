import HG38 from './hg38/hg38';
import MM10 from './mm10/mm10';
import PANTRO5 from './panTro5/panTro5';
import RN6 from './rn6/rn6';
import MYOLUC2 from './myoLuc2/myoLuc2';
import PTEVAM1 from './pteVam1/pteVam1';
import { GenomeConfig } from './GenomeConfig';

/**
 * All available genomes.
 */
export const allGenomes = [
    HG38,
    MM10,
    PANTRO5,
    RN6,
    MYOLUC2,
    PTEVAM1
];

const genomeNameToConfig = {};
for (const config of allGenomes) {
    const genomeName = config.genome.getName();
    if (genomeNameToConfig[genomeName]) {
        // We need this, because when saving session, we save the genome name.
        throw new Error(`Two genomes have the same name ${genomeName}.  Refusing to continue!`);
    }
    genomeNameToConfig[genomeName] = config;
}

interface SpeciesConfig {
    logoUrl: string;
    assemblies: string[];
    color: string;
}

export const treeOfLife: {[speciesName: string]: SpeciesConfig} = {
    human: {
        logoUrl: 'https://epigenomegateway.wustl.edu/browser/images/Human.png',
        assemblies: [ HG19.genome.getName(), HG38.genome.getName() ],
        color: 'white',
    },
    chimp: {
        logoUrl: 'https://epigenomegateway.wustl.edu/browser/images/Chimp.png',
        assemblies: [ PANTRO5.genome.getName() ],
        color: 'white',
    },
    mouse: {
        logoUrl: 'https://epigenomegateway.wustl.edu/browser/images/Mouse.png',
        assemblies: [ MM10.genome.getName(), MM9.genome.getName() ],
        color: 'yellow',
    },
    rat: {
        logoUrl: 'https://epigenomegateway.wustl.edu/browser/images/Rat.png',
        assemblies: [ RN6.genome.getName() ],
        color: 'white',
    },
    "large flying fox": {
        logoUrl: 'https://wangftp.wustl.edu/~xzhuo/bat_genomes/flyingFox.png',
        assemblies: [ PTEVAM1.genome.getName() ],
        color: 'white',
    },
    "little brown bat": {
        logoUrl: 'https://wangftp.wustl.edu/~xzhuo/bat_genomes/littleBrownBat.png',
        assemblies: [ MYOLUC2.genome.getName() ],
        color: 'white',
    },

};

/**
 * @param {string} genomeName - name of a genome
 * @return {GenomeConfig} the genome's configuration object, or null if no such genome exists.
 */
export function getGenomeConfig(genomeName: string): GenomeConfig {
    return genomeNameToConfig[genomeName] || null;
}

export function getSpeciesInfo(genomeName: string) {
    for (const [species, details] of Object.entries(treeOfLife) ) {
        if (details.assemblies.includes(genomeName)) {
            return { name: species, logo: details.logoUrl, color: details.color };
        }
    }
    return {name: '', logo: '', color: ''};
}
