import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth/Auth.vue'
import edsAuthorization from '@/components/Auth/edsAuthorization.vue'
import Main from '@/components/User/Main.vue'
import User from '@/components/User/User.vue'
import planEducation from '@/components/User/planEducation.vue'
import Tests from '@/components/User/Tests.vue'
import Webinars from '@/components/User/Webinars.vue'
import scormPackage from '@/components/User/scormPackage.vue'
import scormPackageIframe from '@/components/User/scormPackageIframe.vue'
import vr from '@/components/User/vr.vue'
import mediaFiles from '@/components/User/mediaFiles.vue'
import Testing from '@/components/User/Testing.vue'
import webinarView from '@/components/User/webinarView.vue'
import testList from '@/components/User/testList.vue'
import chatWebinar from '@/components/User/chatWebinar.vue'
import chatWebinarMessages from '@/components/User/chatWebinarMessages.vue'
import Admin from '@/components/Admin/Admin.vue'
import Statistics from '@/components/Admin/Statistics.vue'
import visitorsLog from '@/components/Admin/visitorsLog.vue'
import visitorsLogTheme from '@/components/Admin/visitorsLogTheme.vue'
import visitorsLogUser from '@/components/Admin/visitorsLogUser.vue'
import UsersAdmin from '@/components/Admin/UsersAdmin.vue'
import planEducationAdmin from '@/components/Admin/planEducationAdmin.vue'
import Themes from '@/components/Admin/Themes.vue'
import TestsAdmin from '@/components/Admin/TestsAdmin.vue'
import Questions from '@/components/Admin/Questions.vue'
import Retake from '@/components/Admin/Retake.vue'
import Exam from '@/components/Admin/Exam.vue'
import Examiners from '@/components/Admin/Examiners.vue'
import reportСard from '@/components/Admin/reportСard.vue'
import reportСardAdministrator from '@/components/Admin/reportСardAdministrator.vue'
import WebinarsAdmin from '@/components/Admin/WebinarsAdmin.vue'
import ConductingWebinar from '@/components/Admin/ConductingWebinar.vue'
import WebinarAdmin from '@/components/Admin/WebinarAdmin.vue'
import QuestionsWebinars from '@/components/Admin/QuestionsWebinars.vue'
import AdminQuestions from '@/components/Admin/AdminQuestions.vue'
import Role from '@/components/Admin/Role.vue'
import CreatePlan from '@/components/Admin/CreatePlan.vue'
import CreateThemes from '@/components/Admin/CreateThemes.vue'
import CreateTest from '@/components/Admin/CreateTest.vue'
import CreateUser from '@/components/Admin/CreateUser.vue'
import UsersTest from '@/components/Admin/UsersTest.vue'
import CreateQuestion from '@/components/Admin/CreateQuestion.vue'
import CreateRetake from '@/components/Admin/CreateRetake.vue'
import EditRetake from '@/components/Admin/EditRetake.vue'
import CreateExam from '@/components/Admin/CreateExam.vue'
import EditExam from '@/components/Admin/EditExam.vue'
import CreateExaminer from '@/components/Admin/CreateExaminer.vue'
import EditExaminer from '@/components/Admin/EditExaminer.vue'
import CreateWebinar from '@/components/Admin/CreateWebinar.vue'
import CreateRecordingWebinar from '@/components/Admin/CreateRecordingWebinar.vue'
import CreateCertificate from '@/components/Admin/CreateCertificate.vue'
import CreateRole from '@/components/Admin/Createrole.vue'
import webinarsViewAdmin from '@/components/Admin/WebinarsViewAdmin.vue'
import ExamForExaminer from '@/components/Admin/ExamForExaminer.vue'
import region from '@/components/Admin/region.vue'
import ExamResults from '@/components/Admin/ExamResults.vue'
import examResultsAdmin from '@/components/Admin/examResultsAdmin.vue'
import webinarForConductingWebinar from '@/components/Admin/webinarForConductingWebinar.vue'
import WebinarExams from '@/components/Admin/WebinarExams.vue'
import scormPackageAdmin from '@/components/Admin/scormPackageAdmin.vue'
import EditPlan from '@/components/Admin/EditPlan.vue'
import EditTheme from '@/components/Admin/EditTheme.vue'
import EditTest from '@/components/Admin/EditTest.vue'
import EditQuestion from '@/components/Admin/EditQuestion.vue'
import EditWebinar from '@/components/Admin/EditWebinar.vue'
import EditRecordingWebinar from '@/components/Admin/EditRecordingWebinar.vue'
import Certificates from '@/components/Admin/Certificates.vue'
import EditCertificate from '@/components/Admin/EditCertificate.vue'
import Scorms from '@/components/Admin/Scorms.vue'
import CreateScorm from '@/components/Admin/CreateScorm.vue'
import EditScorm from '@/components/Admin/EditScorm.vue'
import CreateMediaFile from '@/components/Admin/CreateMediaFile.vue'
import audienceExam from '@/components/Admin/audienceExam.vue'
import createAudienceExam from '@/components/Admin/createAudienceExam.vue'
import editAudienceExam from '@/components/Admin/editAudienceExam.vue'
import audience from '@/components/Admin/audience.vue'
import audienceRegion from '@/components/Admin/audienceRegion.vue'


import Login from "../views/Login"
import Home from "../views/Home"
import Plan from '../views/Main'
import FaceVerification from '../views/FaceVerification'
import Production from '../views/Production'
import Test from '../views/Test'
import WebinarsMob from '../views/Webinars'
import TestList from '../views/TestList'
import WebinarMain from '../views/WebinarMain'
import WebinarsInstructor from '../views/WebinarsInstructor'
import WebinarTest from '../views/WebinarTest'
import QuestionsMob from '../views/Questions'
import TestingMob from '../views/testing'
import WebinarQuestions from '../views/WebinarQuestions'
import WebinarQuestionsUsers from '../views/WebinarQuestionsUsers'
import Online from '../views/Online'
import WebinarStart from '../views/WebinarStart'
import Mediafiles from '../views/Mediafiles'
import WebinarMedia from '../views/WebinarMedia'
import WebinarChat from '../views/WebinarChat'
import WebinarOnline from '../views/WebinarOnline'
import WebinarChatQuestions from '../views/WebinarChatQuestions'
import WebinarAsk from '../views/WebinarAsk'
import InstructorChat from '../views/InstructorChat'
import InstructorDoc from '../views/InstructorDoc'
import WebinarExamsMobile from '../views/WebinarExams'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'Auth',
    //   component: Auth
    // },
    {
      path: '/eds-authorization',
      name: 'edsAuthorization',
      component: edsAuthorization
    },
    {
      path: '/user',
      component: User,
      redirect: '/user/main',
      children: [
        {
          path: 'main',
          component: Main
        },
        {
          path: 'plan-education',
          component: planEducation
        },
        {
          path: 'tests',
          component: Tests
        },
        {
          path: 'webinars',
          component: Webinars
        },
        {
          path: 'scorm-package',
          component: scormPackage
        },
        {
          path: 'scorm-package-iframe',
          component: scormPackageIframe
        },
        {
          path: 'vr',
          component: vr
        },
        {
          path: 'media-files',
          component: mediaFiles
        },
        {
          path: 'testing/:id',
          name: 'testing',
          component: Testing,
          props: (route) => ({
            ...route.params
          })
        },
        {
          path: 'webinar-view/:id',
          component: webinarView
        },
        {
          path: 'test-list/:id',
          component: testList
        },
        {
          path: 'chat-webinar/:id',
          component: chatWebinar
        },
        {
          path: 'chat-webinar-messages/:id',
          component: chatWebinarMessages
        }
      ]
    },
    {
      path: '/admin',
      component: Admin,
      redirect: '/admin/statistics',
      children: [
        {
          path: 'statistics',
          component: Statistics
        },
        {
          path: 'visitors-log',
          component: visitorsLog
        },
        {
          path: 'visitors-log-theme/:id',
          component: visitorsLogTheme
        },
        {
          path: 'visitors-log-user/:id/:themeId',
          component: visitorsLogUser
        },
        {
          path: 'users',
          component: UsersAdmin
        },
        {
          path: 'users-test',
          component: UsersTest
        },
        {
          path: 'create-user',
          component: CreateUser
        },
        {
          path: 'plan-education',
          component: planEducationAdmin
        },
        {
          path: 'create-plan',
          component: CreatePlan
        },
        {
          path: 'edit-plan/:id',
          component: EditPlan
        },
        {
          path: 'themes',
          component: Themes
        },
        {
          path: 'create-themes',
          component: CreateThemes
        },
        {
          path: 'edit-theme/:id',
          component: EditTheme
        },
        {
          path: 'tests',
          component: TestsAdmin
        },
        {
          path: 'create-test',
          component: CreateTest
        },
        {
          path: 'edit-test/:id',
          component: EditTest
        },
        {
          path: 'questions',
          component: Questions
        },
        {
          path: 'create-question',
          component: CreateQuestion
        },
        {
          path: 'edit-question/:id',
          component: EditQuestion
        },
        {
          path: 'retake',
          component: Retake
        },
        {
          path: 'create-retake',
          component: CreateRetake
        },
        {
          path: 'edit-retake/:id',
          component: EditRetake
        },
        {
          path: 'exam',
          component: Exam
        },
        {
          path: 'create-exam',
          component: CreateExam
        },
        {
          path: 'edit-exam/:id',
          component: EditExam
        },
        {
          path: 'examiners',
          component: Examiners
        },
        {
          path: 'create-examiner',
          component: CreateExaminer
        },
        {
          path: 'edit-examiner/:id',
          component: EditExaminer
        },
        {
          path: 'report-card',
          component: reportСard
        },
        {
          path: 'report-card-administrator',
          component: reportСardAdministrator
        },
        {
          path: 'exam-for-examiner/:id',
          component: ExamForExaminer
        },
        {
          path: 'region',
          component: region
        },
        {
          path: 'exam-results/:id',
          component: ExamResults
        },
        {
          path: 'exam-results-admin/:id',
          component: examResultsAdmin
        },
        {
          path: 'webinars',
          component: WebinarsAdmin
        },
        {
          path: 'create-webinar',
          component: CreateWebinar
        },
        {
          path: 'edit-webinar/:id',
          component: EditWebinar
        },
        {
          path: 'webinars-view/:id',
          component: webinarsViewAdmin
        },
        {
          path: 'conducting-webinar',
          component: ConductingWebinar
        },
        {
          path: 'create-recording-webinar',
          component: CreateRecordingWebinar
        },
        {
          path: 'edit-recording-webinar/:id',
          component: EditRecordingWebinar
        },
        {
          path: 'webinar',
          component: WebinarAdmin
        },
        {
          path: 'start-webinar/:id',
          component: webinarForConductingWebinar
        },
        {
          path: 'webinar-exams/:id',
          component: WebinarExams
        },
        {
          path: 'questions-webinars',
          component: QuestionsWebinars
        },
        {
          path: 'admin-questions',
          component: AdminQuestions
        },
        {
          path: 'certificates',
          component: Certificates
        },
        {
          path: 'create-certificate',
          component: CreateCertificate
        },
        {
          path: 'edit-certificate/:id',
          component: EditCertificate
        },
        {
          path: 'role',
          component: Role
        },
        {
          path: 'create-role',
          component: CreateRole
        },
        {
          path: 'scorms',
          component: Scorms
        },
        {
          path: 'create-scorm',
          component: CreateScorm
        },
        {
          path: 'edit-scorm/:id',
          component: EditScorm
        },
        {
          path: 'audience-exam',
          component: audienceExam
        },
        {
          path: 'create-audience-exam',
          component: createAudienceExam
        },
        {
          path: 'edit-audience-exam/:id',
          component: editAudienceExam
        },
        {
          path: 'audience',
          component: audience
        },
        {
          path: 'audience-region/:id',
          component: audienceRegion
        }
      ]
    },
    {
      name: "Login",
      path: "/",
      component: Login
    },
    {
      name: 'Home',
      path: '/main',
      component: Home
    },
    {
      name: 'Plan',
      path: '/plan',
      component: Plan
    },
    {
      name: 'FaceVerification',
      path: '/face',
      component: FaceVerification
    },
    {
      name: 'Production',
      path: '/type/:id',
      component: Production
    },
    {
      name: 'Test',
      path: '/test',
      component: Test
    },
    {
      name: 'Webinars',
      path: '/webinars',
      component: WebinarsMob
    },
    {
      name: 'TestList',
      path: '/test-list/:id',
      component: TestList
    },
    {
      name: 'WebinarMain',
      path: '/webinar-main',
      component: WebinarMain
    },
    {
      name: 'WebinarsInstructor',
      path: '/webinars-instructor',
      component: WebinarsInstructor
    },
    {
      name: 'WebinarTest',
      path: '/webinar-test',
      component: WebinarTest
    },
    {
      name: 'WebinarStart',
      path: '/webinar-start/:id',
      component: WebinarStart
    },
    {
      name: 'Questions',
      path: '/questions',
      component: QuestionsMob
    },
        {
      name: 'testingMob',
      path: '/testing/:id',
      component: TestingMob
    },
    {
      name: 'WeninarQuestions',
      path: '/webinar-questions',
      component: WebinarQuestions
    },
    {
      name: 'Online',
      path: '/online',
      component: Online
    },
    {
      name: 'Mediafiles',
      path: '/mediafiles',
      component: Mediafiles
    },
    {
      name: 'WebinarMedia',
      path: '/webinar-media',
      component: WebinarMedia
    },
    {
      name: 'WebinarChat',
      path: '/webinar-chat/:id',
      component: WebinarChat
    },
    {
      name: 'WebinarOnline',
      path: '/webinar-view/:id',
      component: WebinarOnline
    },
    {
      name: 'WebinarChatQuestions',
      path: '/webinar-chatquestions/:id',
      component: WebinarChatQuestions
    },
    {
      name: 'WebinarAsk',
      path: '/webinar-ask',
      component: WebinarAsk
    },
    {
      name: 'InstructorChat',
      path: '/instructor-chat',
      component: InstructorChat
    },
    {
      name: 'InstructorDoc',
      path: '/instructor-doc',
      component: InstructorDoc
    },
    {
      name: 'WebinarQuestionsUsers',
      path: '/questions-webinars',
      component: WebinarQuestionsUsers
    },
        {
      name: 'WebinarExamsMobile',
      path: '/webinar-exams/:id',
      component: WebinarExamsMobile
    },
  ]

})
