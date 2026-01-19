import {defineStore} from 'pinia'

export const useContentStore = defineStore('content', {
    state: () => {
        return {
            courses: [
                {
                    name: 'Basis HTML',
                    slug: 'basis-html',
                    subCourses: [{
                        name: 'Paragrafen',
                        slug: 'paragrafen',
                        content: [{
                            name: 'Introductie Paragrafen',
                            type: 'text',
                            content: '<h2>Paragrafen scheiden tekst</h2><p>Zonder paragrafen zou alle code op 1 pagina te komen staan.</p>'
                        }, {
                            name: 'Leren over Paragrafen',
                            type: 'learn',
                            content: ''
                        }, {
                            name: 'Tekst in een editor',
                            type: 'editor',
                            content: '<h2>Dit is de editor</h2><p>In de editor kan je volledige pagina\'s maken, die vervolgens rechts op je scherm verschijnen.</p>',
                            preset: '<p>Dit is een paragraaf</p>',
                        }]
                    }, {
                        name: 'Dikgedrukte tekst',
                        slug: 'dikgedrukte-text'
                    }, {
                        name: 'Schuine tekst',
                        slug: 'schuine-text'
                    }, {
                        name: 'Onderstreepte tekst',
                        slug: 'onderstreepte-tekst'
                    }, {
                        name: 'Lijsten',
                        slug: 'lijsten'
                    }]
                },
                {
                    name: 'CSS',
                    slug: 'css'
                },
                {
                    name: 'JavaScript',
                    slug: 'javascript'
                },
                {
                    name: 'Telefoons en Tablets',
                    slug: 'telefoons-en-tablets'
                }
            ],
        }
    },
    getters: {
        getCourseBySlug: (state) => {
            return (courseSlug: string) => state.courses.find((c) => c.slug === courseSlug)
        },
        getSubCourseBySlug: (state) => {
            return (courseSlug: string, subCourseSlug: string) => {
                const course = state.courses.find((c) => c.slug === courseSlug);

                if (!course) throw new Error("Course not found");
                if (!course.subCourses) throw new Error("Course does not have subcourses yet");

                return course.subCourses.find((sc) => sc.slug === subCourseSlug)
            }
        },
        courseSlugExists: (state) => {
            return (courseSlug: string) => state.courses.filter((c) => c.slug === courseSlug).length > 0
        },
    },
})
