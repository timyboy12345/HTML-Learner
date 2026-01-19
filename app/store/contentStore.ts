import {defineStore} from 'pinia'

export const useContentStore = defineStore('content', {
    state: () => {
        return {
            modules: null as null | Module[],
            // courses: [
            //     {
            //         name: 'Basis HTML',
            //         slug: 'basis-html',
            //         subCourses: [{
            //             name: 'Paragrafen',
            //             slug: 'paragrafen',
            //             content: [{
            //                 name: 'Introductie Paragrafen',
            //                 type: 'text',
            //                 content: '<h2>Paragrafen scheiden tekst</h2><p>Zonder paragrafen zou alle code op 1 pagina te komen staan.</p>'
            //             }, {
            //                 name: 'Leren over Paragrafen',
            //                 type: 'learn',
            //                 content: ''
            //             }, {
            //                 name: 'Tekst in een editor',
            //                 type: 'editor',
            //                 content: '<h2>Dit is de editor</h2><p>In de editor kan je volledige pagina\'s maken, die vervolgens rechts op je scherm verschijnen.</p>',
            //                 preset: '<p>Dit is een paragraaf</p>',
            //             }]
            //         }, {
            //             name: 'Dikgedrukte tekst',
            //             slug: 'dikgedrukte-text'
            //         }, {
            //             name: 'Schuine tekst',
            //             slug: 'schuine-text'
            //         }, {
            //             name: 'Onderstreepte tekst',
            //             slug: 'onderstreepte-tekst'
            //         }, {
            //             name: 'Lijsten',
            //             slug: 'lijsten'
            //         }]
            //     },
            //     {
            //         name: 'CSS',
            //         slug: 'css'
            //     },
            //     {
            //         name: 'JavaScript',
            //         slug: 'javascript'
            //     },
            //     {
            //         name: 'Telefoons en Tablets',
            //         slug: 'telefoons-en-tablets'
            //     }
            // ],
        }
    },
    getters: {
        getModuleBySlug: (state) => {
            return (moduleSlug: string) => state.modules ? state.modules.find((m) => m.slug === moduleSlug) : null
        },
        getCourseBySlug: (state) => {
            return (moduleSlug: string, courseSlug: string) => {
                const module = state.modules ? state.modules.find((m) => m.slug === moduleSlug) : null;

                if (!module) throw new Error("Module not found");
                if (!module.courses) throw new Error("Module does not have courses yet");

                return module.courses.find((sc) => sc.slug === courseSlug)
            }
        },
        moduleExists: (state) => {
            return (moduleSlug: string) => state.modules
                ? state.modules.filter((m) => m.slug === moduleSlug).length > 0
                : null
        },
    },
})

export interface Module {
    name: string
    slug: string
    courses: Course[]
}

export interface Course {
    name: string
    slug: string
    slides: any[]
}
