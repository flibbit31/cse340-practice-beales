import { getFacultyById, getSortedFaculty } from '../../models/faculty/faculty.js';

// Route handler for faculty list page
const facultyListPage = (req, res) => {
    //get all faculty by sort
    const sortBy = req.query.sort || 'department';
    const facultyList = getSortedFaculty(sortBy);

    //render the faculty list page
    res.render('faculty/list', {
        title: 'Faculty List',
        facultyList: facultyList
    });
};

// Route handler for faculty detail page
const facultyDetailPage = (req, res, next) => {
    // lookup faculty member
    const facultyId = req.params.facultyId;
    const facultyMember = getFacultyById(facultyId);

    // see if faculty member exists
    if (!facultyMember) {
        const err = new Error(`Faculty member ${facultyId} not found`);
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