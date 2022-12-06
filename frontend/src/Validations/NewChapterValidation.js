import * as yup from 'yup';

export const newChapterSchema = yup.object({
    email: yup.string().email().required("Please enter valid email"),
    chaptername: yup.string().min(2).max(25).required("Please enter valid chapter name"),
    chapterlocation: yup.string().min(2).max(25).required("Please enter valid location"),
    facebookpage:yup.string().required("Please enter valid facebook page"),
    twitter:yup.string().required("Please enter valid facebook page") ,
    establishedyear: yup.string().required("Please enter valid facebook page"),
    institutionname: yup.string().required("Please enter valid facebook page"),
    website: yup.string().required("Please enter valid facebook page"),
})