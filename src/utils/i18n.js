// translate router.meta.title, be used in breadcrumb sidebar tagsview
//generate:形成,造成
export function generateTitle(title) {
   const hasKey = this.$te('route' + title)

   if (hasKey) {
      const translateTitle = this.$t('route' + title)
      return translateTitle
   }

   return title
}