import { getFacultyBySlug, getSortedFaculty } from '../../models/faculty/faculty.js';

// Route handler for faculty list page
const facultyListPage = async (req, res) => {
    //get all faculty by sort and validate sortBy
    const validSortOptions = ['name', 'department', 'title'];
    const sortBy = validSortOptions.includes(req.query.sort) ? req.query.sort : 'department';
    const facultyList = await getSortedFaculty(sortBy);

    //render the faculty list page
    res.render('faculty/list', {
        title: 'Faculty List',
        facultyList: facultyList,
        currentSort: sortBy
    });
};

// Route handler for faculty detail page
const facultyDetailPage = async (req, res, next) => {
    // lookup faculty member
    const facultySlug = req.params.facultySlug;
    const facultyMember = await getFacultyBySlug(facultySlug);

    // see if faculty member returns from Model
    if (Object.keys(facultyMember).length === 0) {
        const err = new Error(`Faculty member ${facultySlug} not found`);
        err.status = 404;
        return next(err);
    }

    // Render faculty member page
    res.render('faculty/detail', {
        title: 'Faculty Member',
        facultyMember: facultyMember
    });
};

export { facultyListPage, facultyDetailPage };