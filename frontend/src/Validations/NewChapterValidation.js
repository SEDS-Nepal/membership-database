import * as yup from 'yup';

export const newChapterSchema = yup.object({
    email: yup.string().email().required("Please enter valid email"),
    chapter_name: yup.string().min(2).max(25).required("Please enter valid chapter name"),
    chapter_location: yup.string().min(2).max(25).required("Please enter valid location"),
    chapter_head: yup.string().min(2).max(25).required("Please enter valid name"),
    chapter_members: yup.number().min(5).required("They must be atleast 5 members"),
    college_estd: yup.string().required("Please enter valid year"),
    college_name: yup.string().required("Please enter valid facebook page"),
    college_address: yup.string().required("Please enter valid address"),
    college_website: yup.string().required("Please enter valid website"),
})